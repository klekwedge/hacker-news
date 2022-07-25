import "./App.css";
import { ChakraProvider } from '@chakra-ui/react'


import NewsList from "./components/NewsList/NewsList";

function App() {
  return (
    <ChakraProvider>
    <div className="App">
      <NewsList />
    </div>
    </ChakraProvider>
  );
}

export default App;
