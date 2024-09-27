import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

test("renders comments app", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/comments/i)).toBeInTheDocument();
});

// test("allows adding a comment", () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );

//   const input = screen.getByLabelText(/new comment/i);
//   const button = screen.getByRole("button", { name: /add comment/i });

//   fireEvent.change(input, { target: { value: "Test Comment" } });
//   fireEvent.click(button);

//   expect(screen.getByText(/test comment/i)).toBeInTheDocument();
// });
