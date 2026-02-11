import { ROUTES } from "@/constant/menu-route";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function DrawerOptions({ onClose }: { onClose: () => void }) {
  const path = usePathname();
  return (
    <Box className='w-62.5 h-full'>
      <Box className='flex flex-col h-full p-3 max-sm:px-2 justify-between'>
        <Box className='gap-1'>
          {
            ROUTES.map((x, idx) => (
              <Fragment key={idx}>
                <List className='py-0.5' key={idx}>
                  {
                    x.map((route) => (
                      <ListItem key={route.id} onClick={() => onClose ()} className='p-0'>
                        <ListItemButton classes={{
                          disabled: 'opacity-100 text-white/60'
                        }} className={classNames('rounded p-0 mx-2', {
                          'bg-primary/60': path.startsWith(route.link)
                        })} disabled={route.inactive || path.startsWith(route.link)} component={Link} href={route.link}>
                          <ListItemIcon className='flex justify-center items-center gap-5 w-full p-1 px-2 rounded text-inherit'>
                            <route.icon className='text-lg' />
                            <ListItemText className='text-inherit!' secondary={route.name} />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
                {idx !== ROUTES.length - 1 && <Divider />}
              </Fragment>
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}