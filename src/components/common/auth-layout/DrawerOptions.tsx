import { Logout } from "@/app/(auth)/logout/actions";
import { ROUTES } from "@/constant/menu-route";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DrawerOptions({ onClose }: { onClose: () => void }) {
  const path = usePathname();
  return (
    <Box className='w-[250px] h-full'>
      <Box className='flex flex-col h-full p-3 max-sm:px-2 justify-between'>
        <Box>
          {
            ROUTES.map((x, idx) => (
              <Box className='py-1' key={idx}>
                {
                  x.map((route) => (
                    <ListItem key={route.id} onClick={() => onClose()} className='p-0'>
                      <ListItemButton className={classNames('rounded p-0 mx-2', {
                        'bg-primary/60': path.startsWith(route.link)
                      })} disabled={route.inactive || path.startsWith(route.link)} component={Link} href={route.link}>
                        <ListItemIcon className='flex justify-center items-center gap-3 w-full p-2 rounded'>
                          <route.icon className='text-xl' />
                          <ListItemText className={classNames({
                            'text-white': path.startsWith(route.link)
                          })} primary={route.name} />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))
                }
                {idx !== ROUTES.length - 1 && <Divider />}
              </Box>
            ))
          }
        </Box>
        <Box component='form' action={Logout}>
          <Link href={'/logout'} passHref>
            <Button type='button' color='error' className='w-full shadow-none opacity-50' variant='contained'>Logout</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}