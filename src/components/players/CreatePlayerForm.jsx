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

export default function CreatePlayerForm() {
  const [submitted, setSubmitted] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = [
    { key: "forward", label: "Forward (FW)" },
    { key: "midfielder", label: "Midfielder (MF)" },
    { key: "defender", label: "Defender (DF)" },
    { key: "goalkeeper", label: "Goalkeeper (GK)" },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    console.log("Client Data:", data);

    try {
      setIsSubmitting(true);

      const result = await createPlayer(data);

      console.log("Server Response:", result);

      setSubmitted(data);
    } catch (error) {
      console.error("Failed to create player:", error);
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
            Fill in the information below to register a new player for the
            club.
          </p>
        </div>

        {/* Form */}
        <Form
          onSubmit={onSubmit}
          validationBehavior="native"
          className="flex w-full flex-col gap-5"
        >
          {/* Player Name */}
          <TextField
            name="name"
            isRequired
            fullWidth
            className={"text-white"}
          >
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
                className="text-white placeholder:text-slate-500"
              />
            </InputGroup>
          </TextField>

          {/* Email */}
          <TextField
            name="email"
            type="email"
            isRequired
            fullWidth
          >
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
                className="text-white placeholder:text-slate-500"
              />
            </InputGroup>
          </TextField>

          {/* Jersey Number + Age */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Jersey Number */}
            <TextField
              name="jerseyNumber"
              type="number"
              isRequired
              fullWidth
            >
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
            <TextField
              name="age"
              type="number"
              isRequired
              fullWidth
            >
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

          {/* Profile Image URL */}
          <TextField
            name="imageUrl"
            type="url"
            fullWidth
          >
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

