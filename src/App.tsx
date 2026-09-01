import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { BookList } from "./components/BookList";
import { ContactSection } from "./components/ContactSection";
import { Header } from "./components/Header";
import { useState } from "react";

export default function App() {
  const [infoOpen, setInfoOpen] = useState(false);
  const handleCloseInfo = () => setInfoOpen(false);
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Header onMenuClick={() => setInfoOpen((prev) => !prev)} />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ py: { xs: 4, md: 6 }, flexGrow: 1 }}
      >
        <Stack spacing={{ xs: 5, md: 8 }}>
          <BookList />
          {infoOpen && <ContactSection onClose={handleCloseInfo} />}
        </Stack>
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} · Book Rent
        </Typography>
      </Box>
    </Box>
  );
}
