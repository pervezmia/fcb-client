"use client";

import { useState } from "react";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";
import { Plus, CircleCheck, CircleXmark } from "@gravity-ui/icons";
import { createFixtureAction } from "@/lib/action/fixture";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  "Upcoming",
  "Live",
  "Completed",
  "Postponed",
  "Cancelled",
];

function formatMatchDate(dateValue) {
  const jsDate = dateValue.toDate(getLocalTimeZone());
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" })
    .format(jsDate)
    .toUpperCase();
  const day = String(jsDate.getDate()).padStart(2, "0");
  const monthShort = new Intl.DateTimeFormat("en-US", { month: "short" })
    .format(jsDate)
    .toUpperCase();
  const year = jsDate.getFullYear();

  return {
    date: `${weekday} ${day} ${monthShort} ${year}`,
    month: new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(jsDate),
  };
}

export default function CreateFixtureForm() {
  const router = useRouter();

  const [matchDate, setMatchDate] = useState(null);
  const [status, setStatus] = useState("Upcoming");
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!matchDate) {
      setSubmitState("error");
      setSubmitMessage("Please select a match date.");
      return;
    }

    const form = e.currentTarget;
    setSubmitState("loading");
    setSubmitMessage("");

    const formData = new FormData(form);
    const { date, month } = formatMatchDate(matchDate);

    const payload = {
      month,
      matches: [
        {
          date,
          time: formData.get("time")?.toString().trim() || "",
          homeTeam: formData.get("homeTeam")?.toString().trim() || "",
          homeLogo: formData.get("homeLogo")?.toString().trim().toUpperCase() || "",
          awayTeam: formData.get("awayTeam")?.toString().trim() || "",
          awayLogo: formData.get("awayLogo")?.toString().trim().toUpperCase() || "",
          status,
          matchCenterUrl: formData.get("matchCenterUrl")?.toString().trim() || "",
        },
      ],
    };

    try {
      const result = await createFixtureAction(payload);

      if (result?.insertedId) {
        setSubmitState("success");
        setSubmitMessage("Fixture created successfully.");
        toast.success("Fixture posted successfully!");
        form.reset();
        setMatchDate(null);
        setStatus("Upcoming");
        router.push("/fixtures");
      } else {
        const errorMsg = result?.error || "Failed to create fixture. Please try again.";
        setSubmitState("error");
        setSubmitMessage(errorMsg);
      }
    } catch (err) {
      console.error(err);
      setSubmitState("error");
      setSubmitMessage("Something went wrong while adding the fixture. Please try again.");
    }
  };

  const isLoading = submitState === "loading";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Create Fixture
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Add a new match to the FC Boraitola fixtures list.
        </p>
      </div>

      <Form
        className="flex flex-col gap-6"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <Fieldset>
          <Fieldset.Legend className="text-white font-medium text-lg mb-2">Match Details</Fieldset.Legend>
          <Fieldset.Group className="grid gap-4">
            <DatePicker
              name="date"
              isRequired
              value={matchDate}
              onChange={setMatchDate}
            >
              <Label className="text-slate-100 font-medium">Match Date</Label>
              <DateField.Group className="bg-slate-900 border-slate-700 text-white">
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} className="text-white" />}
                </DateField.Input>
                <DateField.Suffix>
                  <DatePicker.Trigger className="text-slate-300">
                    <DatePicker.TriggerIndicator />
                  </DatePicker.Trigger>
                </DateField.Suffix>
              </DateField.Group>
              <Description className="text-slate-400 text-xs">
                Also sets the month this fixture is grouped under.
              </Description>
              <FieldError className="text-red-400 text-xs" />
              <DatePicker.Popover>
                <Calendar aria-label="Choose match date" className="bg-slate-900 text-white border-slate-700">
                  <Calendar.Header>
                    <Calendar.YearPickerTrigger className="text-white">
                      <Calendar.YearPickerTriggerHeading />
                      <Calendar.YearPickerTriggerIndicator />
                    </Calendar.YearPickerTrigger>
                    <Calendar.NavButton slot="previous" className="text-white" />
                    <Calendar.NavButton slot="next" className="text-white" />
                  </Calendar.Header>
                  <Calendar.Grid>
                    <Calendar.GridHeader>
                      {(day) => (
                        <Calendar.HeaderCell className="text-slate-400">{day}</Calendar.HeaderCell>
                      )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date) => <Calendar.Cell date={date} className="text-white data-[selected]:bg-primary data-[selected]:text-white" />}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                </Calendar>
              </DatePicker.Popover>
            </DatePicker>

            <TextField name="time" fullWidth isRequired>
              <Label className="text-slate-100 font-medium">Kick-off Time</Label>
              <Input placeholder="e.g. 15:00" className="text-white placeholder:text-slate-500" />
              <FieldError className="text-red-400 text-xs" />
            </TextField>
            
            <TextField name="matchCenterUrl" fullWidth isRequired>
              <Label className="text-slate-100 font-medium">Match Venue</Label>
              <Input placeholder="Kazipur, Sirajganj" className="text-white placeholder:text-slate-500" />
              <FieldError className="text-red-400 text-xs" />
            </TextField>

            <Select
              name="status"
              fullWidth
              isRequired
              selectedKey={status}
              onSelectionChange={(key) => setStatus(key)}
              placeholder="Select match status"
            >
              <Label className="text-slate-100 font-medium">Status</Label>
              <Select.Trigger className="text-white bg-slate-900 border-slate-700">
                <Select.Value className="text-white" />
                <Select.Indicator className="text-slate-300" />
              </Select.Trigger>
              <Select.Popover className="bg-slate-900 border-slate-700">
                <ListBox className="text-white">
                  {STATUS_OPTIONS.map((opt) => (
                    <ListBox.Item key={opt} id={opt} className="text-white hover:bg-slate-800">
                      {opt}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </Fieldset.Group>
        </Fieldset>

        <Fieldset>
          <Fieldset.Legend className="text-white font-medium text-lg mb-2">Teams</Fieldset.Legend>
          <Fieldset.Group className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField name="homeTeam" fullWidth isRequired>
                <Label className="text-slate-100 font-medium">Home Team</Label>
                <Input placeholder="e.g. FC Boraitola" className="text-white placeholder:text-slate-500" />
                <FieldError className="text-red-400 text-xs" />
              </TextField>

              <TextField name="homeLogo" fullWidth isRequired>
                <Label className="text-slate-100 font-medium">Home Logo Code</Label>
                <Input placeholder="e.g. FCB" maxLength={5} className="text-white placeholder:text-slate-500" />
                <Description className="text-slate-400 text-xs">
                  Short badge code shown in the fixture card.
                </Description>
                <FieldError className="text-red-400 text-xs" />
              </TextField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="awayTeam" fullWidth isRequired>
                <Label className="text-slate-100 font-medium">Away Team</Label>
                <Input placeholder="e.g. Young Star Club" className="text-white placeholder:text-slate-500" />
                <FieldError className="text-red-400 text-xs" />
              </TextField>

              <TextField name="awayLogo" fullWidth isRequired>
                <Label className="text-slate-100 font-medium">Away Logo Code</Label>
                <Input placeholder="e.g. YSC" maxLength={5} className="text-white placeholder:text-slate-500" />
                <FieldError className="text-red-400 text-xs" />
              </TextField>
            </div>
          </Fieldset.Group>

          <Fieldset.Actions className="flex-col items-stretch gap-3 mt-4">
            {submitMessage ? (
              <div
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  submitState === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                {submitState === "success" ? (
                  <CircleCheck className="size-4 shrink-0 text-green-400" />
                ) : (
                  <CircleXmark className="size-4 shrink-0 text-red-400" />
                )}
                <span>{submitMessage}</span>
              </div>
            ) : null}

            <Button type="submit" fullWidth isDisabled={isLoading} className="bg-primary text-white font-medium">
              <Plus className="size-4" />
              {isLoading ? "Creating..." : "Create Fixture"}
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
}