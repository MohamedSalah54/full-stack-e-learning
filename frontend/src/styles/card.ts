export const mainContainer = {
  width: 320,
  height: 650,
  borderRadius: 2,
  boxShadow: 3,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "0.3s",
  "&:hover": { boxShadow: 6 },
  mx: "auto",
  mt: 5,
};

export const mainContent = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: 2,
  flex: 1,
};

export const mainTitle = {
  fontFamily: "Tajawal",
  fontWeight: 700,
  fontSize: 20,
  textTransform: "capitalize",
  lineHeight: "100%",
};

export const mainDescription = {
  fontFamily: "Tajawal",
  fontWeight: 400,
  fontSize: 16,
  color: "text.secondary",
  textTransform: "capitalize",
  lineHeight: "100%",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
};

export const bookBtn = (isEnrolled: boolean = false) => ({
  width: 120,
  height: 44,
  borderRadius: "8px",
  textTransform: "capitalize",
  opacity: 1,
  gap: "8px",
  paddingTop: "16px",
  paddingRight: "20px",
  paddingBottom: "16px",
  paddingLeft: "20px",
  fontFamily: "Inter",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "16px",
  lineHeight: "100%",
  letterSpacing: "0%",
  textAlign: "center",
  transition: "0.2s ease",
  cursor: "pointer",

  backgroundColor: isEnrolled ? "#fff" : "#4b5563",
  color: isEnrolled ? "#4b5563" : "#fff",
  border: isEnrolled ? "1px solid #b01e1eff" : "none",

  "&:hover": {
    backgroundColor: isEnrolled ? "#f9fafb" : "#010a1bff",
  },
});

export const priceBeforeDiscount = {
  fontFamily: "Nunito",
  fontWeight: 400,
  fontStyle: "Regular",
  fontSize: "18px",
  lineHeight: "150%",
  letterSpacing: "0%",
  verticalAlign: "middle",
  color: "gray",
  textDecoration: "line-through",
};

export const priceAfterDiscount = {
  fontFamily: "Nunito",
  fontWeight: 600,
  fontStyle: "SemiBold",
  fontSize: "22px",
  lineHeight: "125%",
  letterSpacing: "0%",
  verticalAlign: "middle",
  color: "green",
  marginLeft: "10px",
};

export const priceContainer = {
  width: 268,
  height: 50,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
  padding: 0,
};
