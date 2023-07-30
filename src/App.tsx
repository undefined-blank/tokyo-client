import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-slate-100 ">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
