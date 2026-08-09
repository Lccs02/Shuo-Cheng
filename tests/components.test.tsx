import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { AccessibleDialog } from "@/components/common/AccessibleDialog";
import { EmptyState } from "@/components/common/Primitives";
import { PublicationCard } from "@/components/research/ResearchComponents";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

describe("content components", () => {
  it("renders a natural empty state", () => {
    render(<EmptyState title="项目内容正在整理中。" />);
    expect(screen.getByText("项目内容正在整理中。")).toBeInTheDocument();
  });

  it("opens and closes an accessible dialog", () => {
    const { container } = render(
      <AccessibleDialog trigger="查看详情" title="详情">
        <p>内容</p>
      </AccessibleDialog>,
    );
    fireEvent.click(screen.getByRole("button", { name: "查看详情" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
    fireEvent.click(screen.getByRole("button", { name: /关闭/ }));
    expect(container.querySelector("dialog")).not.toHaveAttribute("open");
  });

  it("offers BibTeX for a complete publication", () => {
    render(
      <PublicationCard
        locale="en"
        publication={{
          id: "sample",
          title: "Verified sample for component testing",
          authors: ["Shuo Cheng"],
          firstAuthor: true,
          status: "accepted",
          bibtex: "@article{sample}",
          tags: [],
          featured: false,
          visible: true,
        }}
      />,
    );
    expect(screen.getByRole("button", { name: "BibTeX" })).toBeInTheDocument();
  });
});
