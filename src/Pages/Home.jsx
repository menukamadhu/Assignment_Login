import React, { useEffect, useState, useRef } from "react";
import Appbar from "../Components/Appbar";
import AuthenticationServices from "../Services/AuthenticationServices";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  // Use states
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [openView, setOpenView] = React.useState(false);
  const [openTask, setOpenTask] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [viewId, setViewId] = useState("");
  const [viewName, setViewName] = useState("");
  const [viewPhone, setViewPhone] = useState("");
  const [viewUserName, setUserName] = useState("");
  const [viewWeb, setViewWeb] = useState("");
  const [viewCity, setViewCity] = useState("");
  const [viewCompany, setViewCompany] = useState("");
  const [task, setTask] = useState("");

  // get all users
  useEffect(() => {
    AuthenticationServices.getAllUsers()
      .then((res) => {
        setUsersList(res.data);
        console.log("users list", usersList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   View Dialog
  const handleClickOpenView = (u) => {
    setOpenView(true);
    setViewId(u.id);
    setViewName(u.name);
    setViewPhone(u.phone);
    setUserName(u.username);
    setViewWeb(u.website);
    setViewCompany(u.company.name);
    setViewCity(u.address.city);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  //  Add Task Dialog
  const handleClickOpenTask = () => {
    setOpenTask(true);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  //   React hook form for show error message
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log("aaaaaaaaaaa");
    const task = {
      task: data.task,
    };
    console.log(task);
    toast.success("Task has been added successfully");
    setOpenTask(false);
  };

  return (
    <div>
      <Appbar />
      <div className="md:px-40 md:py-6">
        {/* map users to list */}

        {usersList?.map((user) => (
          <div key={user.id}>
            <div className="flex flex-row items-center justify-center">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>

                {/* map name */}
                <ListItemText
                  primary={user.name}
                  secondary={
                    <React.Fragment>
                      {/* map email */}
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary">
                        {user.email}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <div className="flex flex-row gap-8">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleClickOpenView(user)}>
                    View
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickOpenTask}>
                    Add task
                  </Button>
                </div>
              </ListItem>
            </div>

            {/* View Dialog */}
            <div>
              <Dialog
                fullScreen={fullScreen}
                open={openView}
                onClose={handleCloseView}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                  {viewName}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Stack spacing={2}>
                      <Item sx={{ color: "black", textAlign: "start" }}>
                        User Id : {viewId}
                      </Item>
                      <Item sx={{ color: "black", textAlign: "start" }}>
                        Phone : {viewPhone}
                      </Item>
                      <Item sx={{ color: "black", textAlign: "start" }}>
                        User Name : {viewUserName}
                      </Item>
                      <Item sx={{ color: "black", textAlign: "start" }}>
                        Website : {viewWeb}
                      </Item>
                      <Item sx={{ color: "black", textAlign: "start" }}>
                        City : {viewCity}
                      </Item>
                      <Item sx={{ color: "black", textAlign: "start" }}>
                        Company : {viewCompany}
                      </Item>
                      <Item sx={{ color: "black", textAlign: "start" }}>
                        Task :
                      </Item>
                    </Stack>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleCloseView}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            {/* View Add Task */}
            <div>
              <Dialog
                fullScreen={fullScreen}
                open={openTask}
                onClose={handleCloseTask}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                  Add a task
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <form
                      action=""
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-4 p-2">
                      <TextField
                        required
                        id="outlined-required"
                        label="Add a task"
                        variant="outlined"
                        name="task"
                        {...register("task", {
                          required: true,
                        })}
                      />
                      {errors.task?.type === "required" && (
                        <p className="text-red-600 text-sm">
                          Please input a task
                        </p>
                      )}
                      <div className="flex flex-row items-end justify-end gap-4 pt-2">
                        <Button autoFocus onClick={handleCloseTask}>
                          Close
                        </Button>
                        <Button type="submit" autoFocus variant="outlined">
                          Add
                        </Button>
                      </div>
                    </form>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
