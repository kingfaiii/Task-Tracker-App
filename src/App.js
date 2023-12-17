import Sidebar from "./views/Sidebar";
import Layout from "./component/Layout";
import Table from "./views/Table";
function App() {
  return (
    <Layout>
      <Sidebar />
      <Table />
    </Layout>
  );
}

export default App;
