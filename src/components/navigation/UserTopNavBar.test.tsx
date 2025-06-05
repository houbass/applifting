import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import UserTopNavBar from "./UserTopNavBar";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Top navbar links", () => {
  const links = [
    { testId: "recent-articles-link", href: "/" },
    { testId: "about-link", href: "/about" },
  ];

  links.forEach(({ testId, href }) => {
    it(`renders ${testId} with correct href`, () => {
      // Mock useRouter
      (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn(),
        asPath: href,
      });

      render(
        <Provider store={store}>
          <UserTopNavBar />
        </Provider>
      );

      const linkWrapper = screen.getByTestId(testId);
      const anchor = linkWrapper.closest("a");
      expect(anchor).toHaveAttribute("href", href);
    });
  });
});
