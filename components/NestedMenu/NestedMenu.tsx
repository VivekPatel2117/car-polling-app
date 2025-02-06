import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
type MenuItem = {
  name:string,
  clickFunc: ()=> void
}
type NestedMenuProps = {
  MenuItems: MenuItem[];
  triggerName: string;
};
export const NestedMenu = ({ ...props }: NestedMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 outline-none">{props.triggerName} <ChevronDown size={"20"} color="#98989f"/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{props.triggerName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {props.MenuItems.map((item, index) => (
          <DropdownMenuItem onClick={item.clickFunc} key={index}>{item.name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
