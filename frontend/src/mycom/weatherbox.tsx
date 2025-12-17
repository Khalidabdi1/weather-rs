import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Cloud } from "lucide-react"
import { useState } from "react"


export default function Weatherbox() {
  const [city, SetCity] = useState<string>("Riyadh");
  const [info, Setinfo] = useState<{ name: string, description: string, deg: string, max: string, min: string }>({
    name: "",
    description: "",
    deg: "",
    max: "",
    min: ""
  })

  async function backend() {

    const res = await fetch(`http://localhost:3000/weather?city=${city}`);
    const data = await res.json()
    console.log(data)
    //name

    Setinfo(prev => ({ ...prev, name: data.name }))
    //description

    Setinfo(prev => ({ ...prev, description: data.weather[0].description }))
    //temperature

    Setinfo(prev => ({ ...prev, deg: data.main.temp }))
    //temp_max

    Setinfo(prev => ({ ...prev, max: data.main.temp_max }))
    //temp_min

    Setinfo(prev => ({ ...prev, min: data.main.temp_min }))


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
        <h1 className="mb-2">{info.name}</h1>
        <div className="flex">
          
        <Item className="bg-zinc-800 w-fit flex justify-center items-center">
          <ItemHeader className="text-center">temperature</ItemHeader>
          <ItemMedia />
          <ItemContent>
            <ItemTitle>{info.deg}</ItemTitle>
            <ItemDescription>Item</ItemDescription>
          </ItemContent>
          <ItemActions />
          <ItemFooter>Item Footer</ItemFooter>
        </Item>

          <Item>
          <ItemHeader>Item Header</ItemHeader>
          <ItemMedia />
          <ItemContent>
            <ItemTitle>Item</ItemTitle>
            <ItemDescription>Item</ItemDescription>
          </ItemContent>
          <ItemActions />
          <ItemFooter>Item Footer</ItemFooter>
        </Item>
        </div>
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