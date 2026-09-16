import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { consumeAdminReturn, useSession } from "./auth/useSession";
import { AdminPage } from "./components/admin/AdminPage";
import { BookList } from "./components/BookList";
import { ContactSection } from "./components/ContactSection";
import { Header } from "./components/Header";
import { useHashRoute } from "./hooks/useHashRoute";

export default function App() {
  const [infoOpen, setInfoOpen] = useState(false);
  const handleCloseInfo = () => setInfoOpen(false);
  const { route, navigate } = useHashRoute();
  const { isAdmin } = useSession();

  // Google drops us back on the bare URL, so restore the panel we came from.
  useEffect(() => {
    if (consumeAdminReturn()) navigate("admin");
  }, [navigate]);

  const isAdminRoute = route === "admin";

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Header
        onMenuClick={() => setInfoOpen((prev) => !prev)}
        onAdminClick={
          isAdmin && !isAdminRoute ? () => navigate("admin") : undefined
        }
      />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ py: { xs: 4, md: 6 }, flexGrow: 1 }}
      >
        {isAdminRoute ? (
          <AdminPage onExit={() => navigate("")} />
        ) : (
          <Stack spacing={{ xs: 5, md: 8 }}>
            <BookList />
            {infoOpen && <ContactSection onClose={handleCloseInfo} />}
          </Stack>
        )}
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} · Book Rent
        </Typography>
      </Box>
    </Box>
  );
}
