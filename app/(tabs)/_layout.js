import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#0f62fe",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />
      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />
      <Tabs.Screen
        name="get"
        options={{
          title: "Get",
          headerTitle: "Conteúdo - Get",
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          headerTitle: "Conteúdo - Post",
        }}
      />
      <Tabs.Screen
        name="delete"
        options={{
          title: "Delete",
          headerTitle: "Conteúdo - Delete",
        }}
      />
      <Tabs.Screen
        name="update"
        options={{
          title: "Update",
          headerTitle: "Conteúdo - update",
        }}
      />
      <Tabs.Screen
        name="getById"
        options={{
          title: "Get by ID",
          headerTitle: "Conteúdo - Get by ID",
        }}
      />
    </Tabs>
  );
}
