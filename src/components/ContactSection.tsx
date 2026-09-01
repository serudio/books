// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import TelegramIcon from "@mui/icons-material/Telegram";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import { contact } from "../data/contact";
import { currency, rentalTerms } from "../data/pricing";
import { Card, Drawer, List } from "@mui/material";

const rates = [
  { label: "За тиждень", value: rentalTerms.perWeek },
  { label: "За 2 тижні", value: rentalTerms.perTwoWeeks },
  { label: "Кожен наступний день", value: rentalTerms.perExtraDay },
  { label: "Застава", value: rentalTerms.pledge },
];

type Props = {
  onClose: () => void;
};

export function ContactSection({ onClose }: Props) {
  return (
    <Drawer open={true} anchor="right" onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography sx={{ mb: 1 }}>{contact.intro}</Typography>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }} title="ціна">
          Вартість
        </Typography>
        <Box sx={{ gap: 1, display: "flex", flexDirection: "column", mb: 2 }}>
          {rates.map((rate) => (
            <Box
              key={rate.label}
              sx={{
                p: 1.5,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "secondary.main" }}
              >
                {rate.value} {currency}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rate.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Card sx={{ p: 1.5, mb: 2, borderRadius: 2 }}>
          <List>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <TelegramIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Telegram"
              secondary={
                <Link
                  href={`https://t.me/${contact.telegram.replace("@", "")}`}
                  target="_blank"
                >
                  {contact.telegram}
                </Link>
              }
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PlaceIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={contact.city}
              secondary={
                <Link href={contact.mapUrl} target="_blank" rel="noreferrer">
                  {contact.address}
                </Link>
              }
            />
          </ListItem>

          </List>
        </Card>
      </Box>
    </Drawer>
  );
}
