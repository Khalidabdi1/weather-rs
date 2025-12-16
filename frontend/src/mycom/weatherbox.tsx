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
import {Cloud} from "lucide-react"
export default function Weatherbox(){

  
    return(
<Card className="w-120 h-100 flex justify-between  box-border">
  <CardHeader>
    <CardTitle>Weather </CardTitle>
    <CardDescription>City weather details</CardDescription>
    <CardAction>
    <Cloud/>
    </CardAction>
  </CardHeader>

  <CardContent className="w-full h-full">
    <p>Card Content</p>
  </CardContent>

  <CardFooter>
     <ButtonGroup className=" w-full">
      <Input placeholder="Search City ..." onKeyDown={(e)=>{
        if(e.key==="Enter"){
          console.log("yes")
        }
      }} />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  </CardFooter>

</Card>
    )
}