import { render, screen } from "@testing-library/react";

import { UserProfile } from ".";

describe("UserProfile", () => {
  it("renders the user name and default image alt text", () => {
    render(<UserProfile name="Jordan Lee" imageUrl="/window.svg" />);

    expect(screen.getByText("Jordan Lee")).toBeInTheDocument();
    expect(screen.getByAltText("Jordan Lee profile picture")).toBeInTheDocument();
  });
});
