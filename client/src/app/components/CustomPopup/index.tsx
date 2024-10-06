import { ReactNode } from "react";
import { Dialog } from "@mui/material";

type CustomPopupType = {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
};

export default function CustomPopup({
  open,
  handleClose,
  children,
}: CustomPopupType) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
        sx={{
          backdropFilter: "blur(1px)",
          "& .MuiBackdrop-root": {
            background: "transparent"
          }
        }}
        PaperProps={{
          sx: {
            background: "transparent",
            width: "100%",
            maxWidth: "627px",
            margin: "10px"
          },
        }}
      >
        <div
          className={`min-h-[450px] max-h-[450px] overflow-auto small-scrollbar relative bg-[#24233b] center flex-col text-white p-5 no-scrollbar`}
        >
          {children}
        </div>
      </Dialog>
    </div>
  );
}
