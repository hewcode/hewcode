import * as React from "react"
import { ChevronDownIcon, CalendarIcon } from "lucide-react"
import { Button } from "../ui/button.jsx"
import { Calendar } from "../ui/calendar.jsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover.jsx"

export default function DateRangePicker({ from, to, onChange }) {
  const [openFrom, setOpenFrom] = React.useState(false)
  const [openTo, setOpenTo] = React.useState(false)
  const [fromDate, setFromDate] = React.useState(from && from !== '' ? new Date(from) : undefined)
  const [toDate, setToDate] = React.useState(to && to !== '' ? new Date(to) : undefined)

  // Update internal state when props change
  React.useEffect(() => {
    setFromDate(from && from !== '' ? new Date(from) : undefined)
    setToDate(to && to !== '' ? new Date(to) : undefined)
  }, [from, to])

  const handleFromSelect = (date) => {
    setFromDate(date)
    const newFrom = date ? date.toISOString().split('T')[0] : ''
    onChange({ from: newFrom, to })
    setOpenFrom(false)
  }

  const handleToSelect = (date) => {
    setToDate(date)
    const newTo = date ? date.toISOString().split('T')[0] : ''
    onChange({ from, to: newTo })
    setOpenTo(false)
  }

  return (
    <div className="flex space-x-2">
      {/* From Date Picker */}
      <Popover open={openFrom} onOpenChange={setOpenFrom}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 justify-between font-normal text-sm h-9"
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? fromDate.toLocaleDateString() : "From date"}
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={handleFromSelect}
          />
        </PopoverContent>
      </Popover>

      {/* To Date Picker */}
      <Popover open={openTo} onOpenChange={setOpenTo}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 justify-between font-normal text-sm h-9"
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {toDate ? toDate.toLocaleDateString() : "To date"}
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={handleToSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}