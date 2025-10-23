import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Box
      sx={{
        width: 288,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        position: "relative",
        opacity: 1,
      }}
    >
      {/* Previous Button */}
      <IconButton
        onClick={handlePrev}
        disabled={currentPage === 1}
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid #C5CAD3",
          padding: "12px 20px",
          opacity: 1,
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
      </IconButton>

      {/* Page Numbers */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <IconButton
            key={page}
            onClick={() => onPageChange(page)}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid #C5CAD3",
              padding: "12px 20px",
              opacity: 1,
              backgroundColor: currentPage === page ? "#1f2937" : "transparent",
              color: currentPage === page ? "#fff" : "#000",
              "&:hover": {
                backgroundColor:
                  currentPage === page ? "#111827" : "rgba(0,0,0,0.05)",
              },
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
              {page}
            </Typography>
          </IconButton>
        ))}
      </Box>

      {/* Next Button */}
      <IconButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid #C5CAD3",
          padding: "12px 20px",
          opacity: 1,
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
};

export default PaginationComponent;
