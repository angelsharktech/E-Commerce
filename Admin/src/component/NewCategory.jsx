import {
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { userInformation } from "../context/AuthContext";
import axios from "axios";

const NewCategory = () => {
    const { user } = useContext(userInformation)
  const [category, setCategory] = useState({
    mainCategory: "",
    subCategories: [""], // start with one empty sub-category input
  });

  const handleMainCategoryChange = (e) => {
    setCategory({ ...category, mainCategory: e.target.value });
  };

  const handleSubCategoryChange = (index, value) => {
    const updatedSubs = [...category.subCategories];
    updatedSubs[index] = value;
    setCategory({ ...category, subCategories: updatedSubs });
  };

  const addSubCategoryInput = () => {
    setCategory({
      ...category,
      subCategories: [...category.subCategories, ""],
    });
  };

  const removeSubCategoryInput = (index) => {
    const updatedSubs = category.subCategories.filter((_, i) => i !== index);
    setCategory({ ...category, subCategories: updatedSubs });
  };

  const addCategory = async () => {
    try {
      const newCategory = {
        ...category,
        categoryBy: user.shop_name,
      };

      const result = await axios.post("/category/addCategory", newCategory);
      console.log(result)
      if (result.data.msg === "Category Added") {
        alert(result.data.msg);
        setCategory({ mainCategory: "", subCategories: [""] });
      } else {
        console.log(result.data.msg);
        
        alert(result.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card
            sx={{ borderRadius: 4, boxShadow: 6, background: "white", p: 3 }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              color="#c26afc"
              gutterBottom
            >
              Category Manager
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              mb={2}
            >
              <TextField
                variant="outlined"
                label="Main Category"
                value={category.mainCategory}
                onChange={handleMainCategoryChange}
                size="small"
                // fullWidth
              />

              <Stack direction="column" spacing={1} >
                {category.subCategories.map((sub, index) => (
                  <Stack direction="row" spacing={1} key={index}>
                    <TextField
                      variant="outlined"
                      label={`Sub Category ${index + 1}`}
                      value={sub}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                      size="small"
                      // fullWidth
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeSubCategoryInput(index)}
                    >
                      Remove
                    </Button>
                  </Stack>
                ))}
              </Stack>
              <Button variant="outlined" onClick={addSubCategoryInput}>
                + Add Sub Category
              </Button>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
                  color: "whitesmoke",
                  fontWeight: 600,
                  px: 4,
                  boxShadow: 2,
                  height: 40,
                }}
                onClick={addCategory}
              >
                Add
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default NewCategory;
