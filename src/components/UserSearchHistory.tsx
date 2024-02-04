import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { getErrorMessage } from "../utils/error-handler";
import { fetchSearchHistory } from "../utils/firebase/firestore";
import { SearchHistoryData } from "../utils/types";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export default function UserSearchHistory({
  setErrorMessage,
}: {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { user } = useContext(AuthContext);
  const [tableData, setTableData] = useState<SearchHistoryData[]>([]);

  useEffect(() => {
    async function fetchData(userId: string) {
      try {
        const data = await fetchSearchHistory(userId);
        console.log(data);
        setTableData(data);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      }
    }
    if (user) {
      fetchData(user.uid);
    }
  }, [user, setErrorMessage]);
  return (
    <Box sx={{ my: 6 }}>
      <TableContainer component={Paper}>
        <Table aria-label="search history table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Search Query</TableCell>
              <TableCell>Time Of Search</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Row({ row }: { row: SearchHistoryData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.searchQuery}
        </TableCell>
        <TableCell>{row.date.toISOString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Search Result
              </Typography>
              <Table size="small" aria-label="search result">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Types</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.searchResult.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell component="th" scope="row">
                        {result.displayName.text}
                      </TableCell>
                      <TableCell>{result.formattedAddress}</TableCell>
                      <TableCell>{result.types.slice(0, -2).join(", ")}</TableCell>
                      <TableCell>
                        <Tooltip title={result.rating} placement="right">
                          <div>
                            <Rating value={result.rating} precision={0.1} readOnly />
                          </div>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
