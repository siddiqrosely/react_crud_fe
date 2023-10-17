import Navbar from './component/Navbar';

import FetchData from './component/FetchData';
import ProductData from './component/ProductData';

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="content">
        <ProductData />
        
      </div>

    </div>
  );
}
export default App;
