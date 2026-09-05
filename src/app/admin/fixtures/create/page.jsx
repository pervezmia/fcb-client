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

const STATUS_OPTIONS = ["Upcoming", "Live", "Completed", "Postponed", "Cancelled"];

const EMPTY_FORM = {
  time: "",
  homeTeam: "",
  homeLogo: "",
  awayTeam: "",
  awayLogo: "",
  status: "Upcoming",
};

// Builds "SAT 10 OCT 2026" + "October 2026" from a DatePicker DateValue.
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
    month: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(jsDate),
  };
}

export default function CreateFixturePage() {
  const [matchDate, setMatchDate] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!matchDate) return;

    setSubmitState("loading");
    setSubmitMessage("");

    const { date, month } = formatMatchDate(matchDate);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fixtures`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month,
          date,
          time: formData.time.trim(),
          homeTeam: formData.homeTeam.trim(),
          homeLogo: formData.homeLogo.trim().toUpperCase(),
          awayTeam: formData.awayTeam.trim(),
          awayLogo: formData.awayLogo.trim().toUpperCase(),
          status: formData.status,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to create fixture");
      }

      setSubmitState("success");
      setSubmitMessage("Fixture created successfully.");
      setMatchDate(null);
      setFormData(EMPTY_FORM);
    } catch (err) {
      setSubmitState("error");
      setSubmitMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Create Fixture</h1>
        <p className="mt-1 text-sm text-muted">
          Add a new match to the FC Boraitola fixtures list.
        </p>
      </div>

      <Form
        className="flex flex-col gap-6"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <Fieldset>
          <Fieldset.Legend>Match Details</Fieldset.Legend>
          <Fieldset.Group className="grid gap-4">
            <DatePicker isRequired value={matchDate} onChange={setMatchDate}>
              <Label>Match Date</Label>
              <DateField.Group>
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateField.Suffix>
                  <DatePicker.Trigger>
                    <DatePicker.TriggerIndicator />
                  </DatePicker.Trigger>
                </DateField.Suffix>
              </DateField.Group>
              <Description>Also sets the month this fixture is grouped under.</Description>
              <FieldError />
              <DatePicker.Popover>
                <Calendar aria-label="Choose match date">
                  <Calendar.Header>
                    <Calendar.YearPickerTrigger>
                      <Calendar.YearPickerTriggerHeading />
                      <Calendar.YearPickerTriggerIndicator />
                    </Calendar.YearPickerTrigger>
                    <Calendar.NavButton slot="previous" />
                    <Calendar.NavButton slot="next" />
                  </Calendar.Header>
                  <Calendar.Grid>
                    <Calendar.GridHeader>
                      {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date) => <Calendar.Cell date={date} />}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                </Calendar>
              </DatePicker.Popover>
            </DatePicker>

            <TextField
              name="time"
              fullWidth
              isRequired
              value={formData.time}
              onChange={(v) => handleChange("time", v)}
            >
              <Label>Kick-off Time</Label>
              <Input placeholder="e.g. 15:00" />
              <FieldError />
            </TextField>

            <Select
              name="status"
              fullWidth
              isRequired
              value={formData.status}
              onChange={(key) => handleChange("status", key)}
              placeholder="Select match status"
            >
              <Label>Status</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {STATUS_OPTIONS.map((status) => (
                    <ListBox.Item key={status} id={status}>
                      {status}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </Fieldset.Group>
        </Fieldset>

        <Fieldset>
          <Fieldset.Legend>Teams</Fieldset.Legend>
          <Fieldset.Group className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                name="homeTeam"
                fullWidth
                isRequired
                value={formData.homeTeam}
                onChange={(v) => handleChange("homeTeam", v)}
              >
                <Label>Home Team</Label>
                <Input placeholder="e.g. FC Boraitola" />
                <FieldError />
              </TextField>

              <TextField
                name="homeLogo"
                fullWidth
                isRequired
                value={formData.homeLogo}
                onChange={(v) => handleChange("homeLogo", v)}
              >
                <Label>Home Logo Code</Label>
                <Input placeholder="e.g. FCB" maxLength={5} />
                <Description>Short badge code shown in the fixture card.</Description>
                <FieldError />
              </TextField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                name="awayTeam"
                fullWidth
                isRequired
                value={formData.awayTeam}
                onChange={(v) => handleChange("awayTeam", v)}
              >
                <Label>Away Team</Label>
                <Input placeholder="e.g. Young Star Club" />
                <FieldError />
              </TextField>

              <TextField
                name="awayLogo"
                fullWidth
                isRequired
                value={formData.awayLogo}
                onChange={(v) => handleChange("awayLogo", v)}
              >
                <Label>Away Logo Code</Label>
                <Input placeholder="e.g. YSC" maxLength={5} />
                <FieldError />
              </TextField>
            </div>
          </Fieldset.Group>

          <Fieldset.Actions className="flex-col items-stretch gap-3">
            {submitMessage ? (
              <div
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  submitState === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-600"
                    : "border-red-500/30 bg-red-500/10 text-red-600"
                }`}
              >
                {submitState === "success" ? (
                  <CircleCheck className="size-4 shrink-0" />
                ) : (
                  <CircleXmark className="size-4 shrink-0" />
                )}
                <span>{submitMessage}</span>
              </div>
            ) : null}

            <Button type="submit" fullWidth isDisabled={submitState === "loading"}>
              <Plus className="size-4" />
              {submitState === "loading" ? "Creating..." : "Create Fixture"}
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
}