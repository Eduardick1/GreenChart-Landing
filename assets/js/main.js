import { PhoneMask, Modal, Menu, Timer } from "./classes.js";

document
  .querySelectorAll(".phone-field")
  .forEach((field) => new PhoneMask(field));

document.addEventListener("click", (event) => {
  const { target } = event;

  if (event.target.closest(`#${Menu.btn.id}`)) Menu.toggle();
  else Menu.close();

  if (target.closest("[data-modal=form]")) Modal.open();
  if (target.closest("[data-modal=closeModal]")) Modal.close();
});

new Timer(600);

// СТРАННОЕ ДИЗ РЕШЕНИЕ

function reArrangeTable() {
  const rows = document.getElementById("trades_table").querySelectorAll("tr");
  rows.forEach((r) => {
    const lastCell = r.children[r.children.length - 1];

    const lastCellClone = lastCell.cloneNode(true);

    lastCell.remove();

    r.insertBefore(lastCellClone, r.firstChild);
  });
}
if (window.matchMedia("(max-width: 700px)").matches) reArrangeTable();
// СТРАННОЕ ДИЗ РЕШЕНИЕ
