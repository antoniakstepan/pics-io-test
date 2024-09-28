import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  styled,
  TextField,
} from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: "16px",
  boxShadow: "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  marginBottom: theme.spacing(1),
}));

export const StyledList = styled(List)(() => ({
  display: "flex",
  flexDirection: "column",
  rowGap: 24,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  minWidth: "400px",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: 6,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
  paddingRight: "24px",
  paddingBottom: "16px",
}));

export const StyledDeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.contrastText,
  backgroundColor: theme.palette.error.light,
  padding: "6px 12px",
  display: "flex",
  alignItems: "center",

  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(1),
  },

  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));
