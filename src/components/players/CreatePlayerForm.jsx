"use client";

import React, { useState } from "react";
import {
  Form,
  Button,
  Label,
  TextField,
  InputGroup,
  Select,
  ListBox,
  ListBoxItem,
  toast,
} from "@heroui/react";

import {
  User,
  Mail,
  Shield,
  Award,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

import { createPlayer } from "@/lib/action/player/createPlayer";
import { useRouter } from "next/navigation";

export default function CreatePlayerForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = [
    { key: "Forward", label: "Forward (FW)" },
    { key: "Midfielder", label: "Midfielder (MF)" },
    { key: "Defender", label: "Defender (DF)" },
    { key: "Goalkeeper", label: "Goalkeeper (GK)" },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setIsSubmitting(true);

      const result = await createPlayer(data);

      // result.success না চেক করলে error হলেও silently redirect হয়ে
      // যেত — এখন toast দিয়ে exact কারণ দেখানো হচ্ছে
      if (!result?.success) {
        toast.danger(result?.error || "Failed to create player");
        return;
      }

      toast.success("Player created successfully!");
      setSubmitted(data);
      router.push("/players");
    } catch (error) {
      toast.danger(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-500/10">
            <Shield className="size-7 text-blue-400" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            Add New Player
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Fill in the information below to register a new player for the club.
          </p>
        </div>

        {/* Form */}
        <Form
          onSubmit={onSubmit}
          validationBehavior="native"
          className="flex w-full flex-col gap-5"
        >
          {/* Player Name */}
          <TextField name="name" isRequired fullWidth>
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Player Name
            </Label>

            <InputGroup
              fullWidth
              variant="secondary"
              className="border border-slate-700 bg-slate-800/60"
            >
              <InputGroup.Prefix>
                <User className="size-4 text-slate-400" />
              </InputGroup.Prefix>

              <InputGroup.Input
                type="text"
                placeholder="e.g. Lionel Messi"
                autoComplete="name"
                className="!text-white
  placeholder:!text-slate-500
  autofill:!text-white
  autofill:[-webkit-text-fill-color:white]"
              />
            </InputGroup>
          </TextField>

          {/* Email */}
          <TextField name="email" type="email" isRequired fullWidth>
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Email Address
            </Label>

            <InputGroup
              fullWidth
              variant="secondary"
              className="border border-slate-700 bg-slate-800/60"
            >
              <InputGroup.Prefix>
                <Mail className="size-4 text-slate-400" />
              </InputGroup.Prefix>

              <InputGroup.Input
                type="email"
                placeholder="player@example.com"
                autoComplete="email"
                className="
        !text-white
        placeholder:!text-slate-500
        autofill:!text-white
        autofill:[-webkit-text-fill-color:white]
      "
              />
            </InputGroup>
          </TextField>

          {/* Jersey Number + Age */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Jersey Number */}
            <TextField name="jerseyNumber" type="number" isRequired fullWidth>
              <Label className="mb-2 text-sm font-medium text-slate-200">
                Jersey Number
              </Label>

              <InputGroup
                fullWidth
                variant="secondary"
                className="border border-slate-700 bg-slate-800/60"
              >
                <InputGroup.Prefix>
                  <Award className="size-4 text-slate-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  type="number"
                  placeholder="e.g. 10"
                  className="text-white placeholder:text-slate-500"
                />
              </InputGroup>
            </TextField>

            {/* Age */}
            <TextField name="age" type="number" isRequired fullWidth>
              <Label className="mb-2 text-sm font-medium text-slate-200">
                Age
              </Label>

              <InputGroup
                fullWidth
                variant="secondary"
                className="border border-slate-700 bg-slate-800/60"
              >
                <InputGroup.Prefix>
                  <Calendar className="size-4 text-slate-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  type="number"
                  placeholder="e.g. 24"
                  className="text-white placeholder:text-slate-500"
                />
              </InputGroup>
            </TextField>
          </div>

          {/* Position */}
          <Select
            name="position"
            placeholder="Select playing position"
            className="w-full"
          >
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Playing Position
            </Label>

            <Select.Trigger
              className="
                w-full rounded-xl
                border border-slate-700
                bg-slate-800/60
                px-4 py-3
                text-white
              "
            >
              <Select.Value />
            </Select.Trigger>

            <Select.Popover
              className="
                rounded-xl
                border border-slate-700
                bg-slate-900
                p-1
                shadow-2xl
              "
            >
              <ListBox items={positions}>
                {(item) => (
                  <ListBoxItem
                    key={item.key}
                    id={item.key}
                    className="
                      cursor-pointer rounded-lg
                      px-3 py-2
                      text-slate-300
                      hover:bg-slate-800
                      hover:text-white
                    "
                  >
                    {item.label}
                  </ListBoxItem>
                )}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Team Select */}

          <Select name="team" placeholder="Select team" className="w-full">
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Team
            </Label>

            <Select.Trigger
              className="
      w-full rounded-xl
      border border-slate-700
      bg-slate-800/60
      px-4 py-3
      text-white
    "
            >
              <Select.Value />
            </Select.Trigger>

            <Select.Popover
              className="
      rounded-xl
      border border-slate-700
      bg-slate-900
      p-1
      shadow-2xl
    "
            >
              <ListBox>
                <ListBoxItem
                  id="fc-boraitola"
                  className="cursor-pointer rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  FC Boraitola
                </ListBoxItem>

                <ListBoxItem
                  id="boraitola-tigers"
                  className="cursor-pointer rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Boraitola Tigers
                </ListBoxItem>
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Nationality Select */}

          <Select
            name="nationality"
            placeholder="Select nationality"
            className="w-full"
          >
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Nationality
            </Label>

            <Select.Trigger
              className="
      w-full rounded-xl
      border border-slate-700
      bg-slate-800/60
      px-4 py-3
      text-white
    "
            >
              <Select.Value />
            </Select.Trigger>

            <Select.Popover
              className="
      rounded-xl
      border border-slate-700
      bg-slate-900
      p-1
      shadow-2xl
    "
            >
              <ListBox>
                <ListBoxItem
                  id="bangladeshi"
                  className="cursor-pointer rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Bangladeshi
                </ListBoxItem>
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Joined Date with FCB */}
          <TextField name="joinedDate" type="date" isRequired fullWidth>
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Joined Date with FCB
            </Label>

            <InputGroup
              fullWidth
              variant="secondary"
              className="border border-slate-700 bg-slate-800/60"
            >
              <InputGroup.Prefix>
                <Calendar className="size-4 text-slate-400" />
              </InputGroup.Prefix>

              <InputGroup.Input
                type="date"
                className="
        !text-white
        [color-scheme:dark]
      "
              />
            </InputGroup>
          </TextField>

          {/* Profile Image URL */}
          <TextField name="imageUrl" type="url" fullWidth>
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Profile Image URL
            </Label>

            <InputGroup
              fullWidth
              variant="secondary"
              className="border border-slate-700 bg-slate-800/60"
            >
              <InputGroup.Prefix>
                <ImageIcon className="size-4 text-slate-400" />
              </InputGroup.Prefix>

              <InputGroup.Input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="text-white placeholder:text-slate-500"
              />
            </InputGroup>
          </TextField>

          <TextField name="bio" fullWidth>
            <Label className="mb-2 text-sm font-medium text-slate-200">
              Player Bio
            </Label>

            <InputGroup
              fullWidth
              variant="secondary"
              className="border border-slate-700 bg-slate-800/60"
            >
              <InputGroup.Input
                placeholder="Write something about the player..."
                className="text-white placeholder:text-slate-500"
              />
            </InputGroup>
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="
              mt-3 w-full
              rounded-xl
              bg-blue-600
              py-6
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-700
            "
          >
            {isSubmitting ? "Creating Player..." : "Create Player"}
          </Button>
        </Form>

        {/* Success */}
        {submitted && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="mb-2 font-semibold text-emerald-400">
              ✓ Player Created Successfully!
            </p>

            <pre className="overflow-x-auto text-xs leading-6 text-slate-300">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}