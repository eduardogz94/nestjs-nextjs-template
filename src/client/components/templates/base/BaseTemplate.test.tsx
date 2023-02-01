import { render } from "@testing-library/react";
import BaseTemplate from "./BaseTemplate";

describe("BaseTemplate", () => {
  it("renders correctly", () => {
    const { container } = render(<BaseTemplate sample="sample content" />);
    expect(container).toMatchSnapshot();
  });
});
