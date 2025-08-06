"use client"

import { Calendar } from "@/components/ui/calendar"
import { ja } from "date-fns/locale"
import { useState } from "react"

interface CustomCalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  mode?: "single" | "multiple" | "range"
}

export default function CustomCalendar({
  selected,
  onSelect,
  disabled,
  mode = "single"
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  return (
    <div className="custom-calendar">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        locale={ja}
        showOutsideDays={false}
        className="custom-calendar"
        required={false}
      />
    </div>
  )
} 