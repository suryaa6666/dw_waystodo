import { Box, Text, Menu, Button, Image } from "native-base";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { showMessage } from "react-native-flash-message";
import { useQuery } from "react-query";
import { API } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ navigation }) {
  const [state, dispatch] = useContext(UserContext);
  const [shouldOverlapWithTrigger] = useState(false);

  let { data: list } = useQuery("listCaches", async () => {
    const response = await API.get("/List");
    console.log("response list", response.data);
    return response.data;
  });

  function handleLogout() {
    AsyncStorage.removeItem("token");
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    console.log(state);
    showMessage({
      message: "Logout berhasil!",
      type: "success",
    });
    navigation.navigate("Welcome");
  }

  return (
    <Box display="flex" flex={1} alignItems="center" bg="white">
      <Box display="flex" flexDirection="row" w={"85%"} my={10}>
        <Box flex={1} justifyContent="center" mx={2}>
          <Text fontWeight="bold" fontSize={30}>
            Hi {state?.data?.user?.firstName}
          </Text>
          <Text fontSize={15} color="error.500">
            {list && Object.keys(list).length} Lists
          </Text>
        </Box>
        <Box flex={1} justifyContent="center" alignItems="flex-end" mx={2}>
          <Menu
            w="160"
            shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
            placement={"bottom right"}
            trigger={(triggerProps) => {
              return (
                <Button variant="ghost" {...triggerProps}>
                  <Image
                    source={{
                      uri: "https://assets.promediateknologi.com/crop/0x0:0x0/750x500/photo/2022/03/06/539978531.jpg",
                    }}
                    w={50}
                    h={50}
                    borderRadius="100%"
                    borderWidth="2px"
                    borderColor="error.500"
                  />
                </Button>
              );
            }}
          >
            <Menu.Item onPress={handleLogout}>Logout</Menu.Item>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
