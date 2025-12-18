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
  // ItemFooter,
  // ItemHeader,
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
        
        <div className="grid grid-cols-3 grid-rows-2 space-x-2 space-y-2 p-1 gap-2">
          
        <Item className="bg-zinc-800  col-span-1 justify-center items-center h-20">
          {/* <ItemHeader className="text-center flex justify-center items-center">temperature</ItemHeader> */}
          <ItemMedia />
          <ItemContent>
            <ItemTitle  className="text-center flex justify-center items-center w-full">city</ItemTitle>
            <ItemDescription className="text-center flex justify-center items-center">{info.name}</ItemDescription>
          </ItemContent>
          <ItemActions />
          {/* <ItemFooter>Item Footer</ItemFooter> */}
        </Item>

        <Item className="bg-zinc-800  col-span-1 justify-center items-center h-20">
          {/* <ItemHeader className="text-center flex justify-center items-center">temperature</ItemHeader> */}
          <ItemMedia />
          <ItemContent>
            <ItemTitle  className="text-center flex justify-center items-center w-full" >Description</ItemTitle>
            <ItemDescription className="text-center flex justify-center items-center">{info.description}</ItemDescription>
          </ItemContent>
          <ItemActions />
          {/* <ItemFooter>Item Footer</ItemFooter> */}
        </Item>

           <Item className="bg-zinc-800  col-span-1 justify-center items-center h-20">
          {/* <ItemHeader className="text-center flex justify-center items-center">temperature</ItemHeader> */}
          <ItemMedia />
          <ItemContent>
            <ItemTitle  className="text-center flex justify-center items-center w-full">temperature</ItemTitle>
            <ItemDescription className="text-center flex justify-center items-center">{info.deg}</ItemDescription>
          </ItemContent>
          <ItemActions />
          {/* <ItemFooter>Item Footer</ItemFooter> */}
        </Item>


           <Item className="bg-zinc-800  col-span-1 justify-center items-center h-20">
          {/* <ItemHeader className="text-center flex justify-center items-center">temperature</ItemHeader> */}
          <ItemMedia />
          <ItemContent>
            <ItemTitle  className="text-center flex justify-center items-center w-full">Max</ItemTitle>
            <ItemDescription className="text-center flex justify-center items-center">{info.max}</ItemDescription>
          </ItemContent>
          <ItemActions />
          {/* <ItemFooter>Item Footer</ItemFooter> */}
        </Item>



           <Item className="bg-zinc-800  col-span-1 justify-center items-center h-20">
          {/* <ItemHeader className="text-center flex justify-center items-center">temperature</ItemHeader> */}
          <ItemMedia />
          <ItemContent>
            <ItemTitle  className="text-center flex justify-center items-center w-full">Min</ItemTitle>
            <ItemDescription className="text-center flex justify-center items-center">{info.min}</ItemDescription>
          </ItemContent>
          <ItemActions />
          {/* <ItemFooter>Item Footer</ItemFooter> */}
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
          <Button variant="outline" aria-label="Search" onClick={backend}>
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </CardFooter>

    </Card>
  )
}