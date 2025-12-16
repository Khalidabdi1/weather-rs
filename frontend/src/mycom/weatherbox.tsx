import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Cloud } from "lucide-react"
import {  useState } from "react"


export default function Weatherbox() {
  const [city, SetCity] = useState<string>("Riyadh")

  async function backend() {

    const res = await fetch(`http://localhost:3000/weather?city=${city}`);
    const data = await res.json()
    console.log(data)
  }




  return (
    <Card className="w-120 h-100 flex justify-between  box-border">
      <CardHeader>
        <CardTitle>Weather </CardTitle>
        <CardDescription>City weather details</CardDescription>
        <CardAction>
          <Cloud />
        </CardAction>
      </CardHeader>

      <CardContent className="w-full h-full">
        <p>Card Content</p>
      </CardContent>

      <CardFooter>
        <ButtonGroup className=" w-full">
          <Input placeholder="Search City ..." onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(e.key)
             backend()
            }
          }}
            onChange={((e) => {
              SetCity(e.target.value)
              
            })}
          />
          <Button variant="outline" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </CardFooter>

    </Card>
  )
}