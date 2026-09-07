// "use client";

// import { useState } from "react";
// import {
//   Button,
//   Calendar,
//   DateField,
//   DatePicker,
//   Description,
//   FieldError,
//   Fieldset,
//   Form,
//   Input,
//   Label,
//   ListBox,
//   Select,
//   TextField,
// } from "@heroui/react";
// import { getLocalTimeZone } from "@internationalized/date";
// import { Plus, CircleCheck, CircleXmark } from "@gravity-ui/icons";
// import { createFixtureAction } from "@/lib/action/fixture";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// const STATUS_OPTIONS = [
//   "Upcoming",
//   "Live",
//   "Completed",
//   "Postponed",
//   "Cancelled",
// ];

// // Builds "SAT 10 OCT 2026" + "October 2026" from a DatePicker DateValue.
// function formatMatchDate(dateValue) {
//   const jsDate = dateValue.toDate(getLocalTimeZone());
//   const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" })
//     .format(jsDate)
//     .toUpperCase();
//   const day = String(jsDate.getDate()).padStart(2, "0");
//   const monthShort = new Intl.DateTimeFormat("en-US", { month: "short" })
//     .format(jsDate)
//     .toUpperCase();
//   const year = jsDate.getFullYear();

//   return {
//     date: `${weekday} ${day} ${monthShort} ${year}`,
//     month: new Intl.DateTimeFormat("en-US", {
//       month: "long",
//       year: "numeric",
//     }).format(jsDate),
//   };
// }

// export default function CreateFixturePage() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [matchDate, setMatchDate] = useState(null);
//   const [status, setStatus] = useState("Upcoming");
//   const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
//   const [submitMessage, setSubmitMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!matchDate) return;

//     const form = e.currentTarget;
//     setLoading(true);
//     setError("");

//     const formData = new FormData(form);
//     const rawData = Object.fromEntries(formData.entries());
//     console.log(rawData);

//     const payload = {
//       month: rawData.date,
//       matches: [
//         {
//           date: rawData.date,
//           time: rawData.time,
//           homeTeam: rawData.homeTeam,
//           homeLogo: rawData.homeLogo,
//           awayTeam: rawData.awayTeam,
//           awayLogo: rawData.awayLogo,
//           status: rawData.status,
//           matchCenterUrl: rawData.matchCenterUrl,
//         },
//       ],
//     };

//     console.log(payload);
//     const result = await createFixtureAction(payload);

//     try {
//       if (result?.insertedId) {
//         toast.success("fixture posted successfully!");
//         form.reset();
//         router.push("/fixtures");
//       } else if (result?.error) {
//         setError(result.error);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(
//         "Something went wrong while adding the product. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }

//     const { date, month } = formatMatchDate(matchDate);

//     // ডেটা হ্যান্ডেল করার জন্য অতিরিক্ত ফিল্ডগুলো FormData-তে অ্যাপেন্ড করা হলো
//     formData.append("month", month);
//     formData.append("date", date);
//     formData.append("status", status);

//     // ট্রিম এবং ফরম্যাটিং ঠিক রাখা
//     formData.set("time", formData.get("time")?.toString().trim() || "");
//     formData.set("homeTeam", formData.get("homeTeam")?.toString().trim() || "");
//     formData.set(
//       "homeLogo",
//       formData.get("homeLogo")?.toString().trim().toUpperCase() || "",
//     );
//     formData.set("awayTeam", formData.get("awayTeam")?.toString().trim() || "");
//     formData.set(
//       "awayLogo",
//       formData.get("awayLogo")?.toString().trim().toUpperCase() || "",
//     );

//     if (result.success) {
//       setSubmitState("success");
//       setSubmitMessage("Fixture created successfully.");
//       setMatchDate(null);
//       setStatus("Upcoming");
//       form.reset();
//     } else {
//       setSubmitState("error");
//       setSubmitMessage(result.error);
//     }
//   };

//   return (
//     <div className="mx-auto w-full max-w-2xl px-4 py-10">
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-foreground">
//           Create Fixture
//         </h1>
//         <p className="mt-1 text-sm text-muted">
//           Add a new match to the FC Boraitola fixtures list.
//         </p>
//       </div>

//       <Form
//         className="flex flex-col gap-6"
//         validationBehavior="native"
//         onSubmit={handleSubmit}
//       >
//         <Fieldset>
//           <Fieldset.Legend>Match Details</Fieldset.Legend>
//           <Fieldset.Group className="grid gap-4">
//             <DatePicker
//               name="date"
//               isRequired
//               value={matchDate}
//               onChange={setMatchDate}
//             >
//               <Label>Match Date</Label>
//               <DateField.Group>
//                 <DateField.Input>
//                   {(segment) => <DateField.Segment segment={segment} />}
//                 </DateField.Input>
//                 <DateField.Suffix>
//                   <DatePicker.Trigger>
//                     <DatePicker.TriggerIndicator />
//                   </DatePicker.Trigger>
//                 </DateField.Suffix>
//               </DateField.Group>
//               <Description>
//                 Also sets the month this fixture is grouped under.
//               </Description>
//               <FieldError />
//               <DatePicker.Popover>
//                 <Calendar aria-label="Choose match date">
//                   <Calendar.Header>
//                     <Calendar.YearPickerTrigger>
//                       <Calendar.YearPickerTriggerHeading />
//                       <Calendar.YearPickerTriggerIndicator />
//                     </Calendar.YearPickerTrigger>
//                     <Calendar.NavButton slot="previous" />
//                     <Calendar.NavButton slot="next" />
//                   </Calendar.Header>
//                   <Calendar.Grid>
//                     <Calendar.GridHeader>
//                       {(day) => (
//                         <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
//                       )}
//                     </Calendar.GridHeader>
//                     <Calendar.GridBody>
//                       {(date) => <Calendar.Cell date={date} />}
//                     </Calendar.GridBody>
//                   </Calendar.Grid>
//                 </Calendar>
//               </DatePicker.Popover>
//             </DatePicker>

//             <TextField name="time" fullWidth isRequired>
//               <Label>Kick-off Time</Label>
//               <Input placeholder="e.g. 15:00" />
//               <FieldError />
//             </TextField>
//             <TextField name="matchCenterUrl" fullWidth isRequired>
//               <Label>Match Center</Label>
//               <Input placeholder="Kazipur, Sirajgang" />
//               <FieldError />
//             </TextField>

//             <Select
//               name="status"
//               fullWidth
//               isRequired
//               selectedKey={status}
//               onSelectionChange={(key) => setStatus(key)}
//               placeholder="Select match status"
//             >
//               <Label>Status</Label>
//               <Select.Trigger>
//                 <Select.Value />
//                 <Select.Indicator />
//               </Select.Trigger>
//               <Select.Popover>
//                 <ListBox>
//                   {STATUS_OPTIONS.map((opt) => (
//                     <ListBox.Item key={opt} id={opt}>
//                       {opt}
//                     </ListBox.Item>
//                   ))}
//                 </ListBox>
//               </Select.Popover>
//             </Select>
//           </Fieldset.Group>
//         </Fieldset>

//         <Fieldset>
//           <Fieldset.Legend>Teams</Fieldset.Legend>
//           <Fieldset.Group className="grid gap-4">
//             <div className="grid grid-cols-2 gap-4">
//               <TextField name="homeTeam" fullWidth isRequired>
//                 <Label>Home Team</Label>
//                 <Input placeholder="e.g. FC Boraitola" />
//                 <FieldError />
//               </TextField>

//               <TextField name="homeLogo" fullWidth isRequired>
//                 <Label>Home Logo Code</Label>
//                 <Input placeholder="e.g. FCB" maxLength={5} />
//                 <Description>
//                   Short badge code shown in the fixture card.
//                 </Description>
//                 <FieldError />
//               </TextField>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <TextField name="awayTeam" fullWidth isRequired>
//                 <Label>Away Team</Label>
//                 <Input placeholder="e.g. Young Star Club" />
//                 <FieldError />
//               </TextField>

//               <TextField name="awayLogo" fullWidth isRequired>
//                 <Label>Away Logo Code</Label>
//                 <Input placeholder="e.g. YSC" maxLength={5} />
//                 <FieldError />
//               </TextField>
//             </div>
//           </Fieldset.Group>

//           <Fieldset.Actions className="flex-col items-stretch gap-3">
//             {submitMessage ? (
//               <div
//                 className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
//                   submitState === "success"
//                     ? "border-green-500/30 bg-green-500/10 text-green-600"
//                     : "border-red-500/30 bg-red-500/10 text-red-600"
//                 }`}
//               >
//                 {submitState === "success" ? (
//                   <CircleCheck className="size-4 shrink-0" />
//                 ) : (
//                   <CircleXmark className="size-4 shrink-0" />
//                 )}
//                 <span>{submitMessage}</span>
//               </div>
//             ) : null}

//             <Button
//               type="submit"
//               fullWidth
//               isDisabled={submitState === "loading"}
//             >
//               <Plus className="size-4" />
//               {submitState === "loading" ? "Creating..." : "Create Fixture"}
//             </Button>
//           </Fieldset.Actions>
//         </Fieldset>
//       </Form>
//     </div>
//   );
// }


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

export default function CreateFixturePage() {
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
    console.log(formData);

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

    console.log(payload);

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
        <h1 className="text-2xl font-semibold text-foreground">
          Create Fixture
        </h1>
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
            <DatePicker
              name="date"
              isRequired
              value={matchDate}
              onChange={setMatchDate}
            >
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
              <Description>
                Also sets the month this fixture is grouped under.
              </Description>
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
                      {(day) => (
                        <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                      )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date) => <Calendar.Cell date={date} />}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                </Calendar>
              </DatePicker.Popover>
            </DatePicker>

            <TextField name="time" fullWidth isRequired>
              <Label>Kick-off Time</Label>
              <Input placeholder="e.g. 15:00" />
              <FieldError />
            </TextField>
            <TextField name="matchCenterUrl" fullWidth isRequired>
              <Label>Match Venue</Label>
              <Input placeholder="Kazipur, Sirajganj" />
              <FieldError />
            </TextField>

            <Select
              name="status"
              fullWidth
              isRequired
              selectedKey={status}
              onSelectionChange={(key) => setStatus(key)}
              placeholder="Select match status"
            >
              <Label>Status</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {STATUS_OPTIONS.map((opt) => (
                    <ListBox.Item key={opt} id={opt}>
                      {opt}
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
              <TextField name="homeTeam" fullWidth isRequired>
                <Label>Home Team</Label>
                <Input placeholder="e.g. FC Boraitola" />
                <FieldError />
              </TextField>

              <TextField name="homeLogo" fullWidth isRequired>
                <Label>Home Logo Code</Label>
                <Input placeholder="e.g. FCB" maxLength={5} />
                <Description>
                  Short badge code shown in the fixture card.
                </Description>
                <FieldError />
              </TextField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="awayTeam" fullWidth isRequired>
                <Label>Away Team</Label>
                <Input placeholder="e.g. Young Star Club" />
                <FieldError />
              </TextField>

              <TextField name="awayLogo" fullWidth isRequired>
                <Label>Away Logo Code</Label>
                <Input placeholder="e.g. YSC" maxLength={5} />
                <FieldError />
              </TextField>
            </div>
          </Fieldset.Group>

          <Fieldset.Actions className="flex-col items-stretch gap-3 mt-4">
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

            <Button
              type="submit"
              fullWidth
              isDisabled={isLoading}
            >
              <Plus className="size-4" />
              {isLoading ? "Creating..." : "Create Fixture"}
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
}
