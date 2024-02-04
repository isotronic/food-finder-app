import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Rating,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FormEvent, useEffect, useState } from "react";
import { fetchSearchPreferences, saveSearchPreferences } from "../utils/firebase/firestore";
import { getErrorMessage } from "../utils/error-handler";
import { firebaseAuth } from "../utils/firebase/auth";

export default function UserSearchPreference({
  setErrorMessage,
}: {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const theme = useTheme();
  const [minRating, setMinRating] = useState<number | null>(0);
  const [searchRadius, setSearchRadius] = useState(500);
  const [priceLevels, setPriceLevels] = useState<string[]>([]);
  const [openNow, setOpenNow] = useState<boolean | undefined>(false);
  const user = firebaseAuth.currentUser;

  const priceLevelOptions = [
    { text: "Unspecified", value: "PRICE_LEVEL_UNSPECIFIED" },
    { text: "Inexpensive", value: "PRICE_LEVEL_INEXPENSIVE" },
    { text: "Moderate", value: "PRICE_LEVEL_MODERATE" },
    { text: "Expensive", value: "PRICE_LEVEL_EXPENSIVE" },
    { text: "Very Expensive", value: "PRICE_LEVEL_VERY_EXPENSIVE" },
  ];

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await fetchSearchPreferences(user.uid, {
            setSearchRadius,
            setMinRating,
            setPriceLevels,
            setOpenNow,
          });
        } catch (error) {
          setErrorMessage(getErrorMessage(error));
        }
      }
    });

    return () => unsubscribe();
  }, [setErrorMessage]);

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user) {
      try {
        await saveSearchPreferences(user.uid, { searchRadius, minRating, priceLevels, openNow });
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      }
    }
  }

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" sx={{ my: 4 }}>
        Search option preferences
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={6}>
          <Grid md={6}>
            <Typography sx={{ my: 2 }}>
              Choose the distance from your location for which we should search for restaurants:
            </Typography>
          </Grid>
          <Grid md>
            <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
              <TextField
                name="search-radius"
                label="Search Radius (m)"
                helperText="Select a search radius"
                select
                value={searchRadius}
                onChange={(event) => setSearchRadius(+event.target.value)}
              >
                <MenuItem value={250}>250</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={750}>750</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={1500}>1500</MenuItem>
                <MenuItem value={2000}>2000</MenuItem>
              </TextField>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Typography sx={{ my: 2 }}>
              Customise your search results by selecting specific price levels. By default, all
              price levels are included in the search:
            </Typography>
          </Grid>
          <Grid md>
            <Box display="flex" justifyContent="flex-end">
              <FormControl sx={{ my: 2, width: 300 }}>
                <InputLabel id="price-levels-label">Price Levels</InputLabel>
                <Select
                  labelId="price-levels-label"
                  id="price-levels"
                  placeholder="You can select multiple options"
                  multiple
                  value={priceLevels}
                  onChange={(event) =>
                    setPriceLevels(
                      typeof event.target.value === "string"
                        ? event.target.value.split(",")
                        : event.target.value
                    )
                  }
                  input={<OutlinedInput label="Price Levels" />}
                >
                  {priceLevelOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      style={{
                        fontWeight:
                          priceLevels.indexOf(option.value) === -1
                            ? theme.typography.fontWeightRegular
                            : theme.typography.fontWeightMedium,
                      }}
                    >
                      {option.text}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>You can select multiple options</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Typography sx={{ my: 2 }}>
              Filter your search results to only show those with great user ratings. Just set a
              limit for the minimum average rating you'd like to see:
            </Typography>
          </Grid>
          <Grid md>
            <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
              <Box>
                <Typography>Minimum Rating</Typography>
                <Rating
                  name="min-rating"
                  precision={0.5}
                  value={minRating}
                  onChange={(_event, newValue) => setMinRating(newValue)}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Typography sx={{ my: 2 }}>
              You can filter your search results to show only open restaurants. If you select this,
              any restaurant that didn't set opening times on Google will not appear:
            </Typography>
          </Grid>
          <Grid md>
            <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Open Now"
                checked={openNow}
                onChange={(event) => setOpenNow((event.target as HTMLInputElement).checked)}
              />
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
          <Button variant="contained" type="submit">
            Save Options
          </Button>
        </Box>
      </form>
    </Box>
  );
}
