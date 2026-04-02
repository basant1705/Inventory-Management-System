let items = [];

function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);
  const price = parseFloat(document.getElementById('itemPrice').value);

  if (!name || isNaN(qty) || qty <= 0 || isNaN(price) || price <= 0) {
    alert('Please enter valid item details.');
    return;
  }

  const total = qty * price;
  items.push({ name, qty, price, total });
  updateTable();
  updateTotals();

  // Clear inputs
  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
  document.getElementById('itemPrice').value = '';
}

function updateTable() {
  const tbody = document.getElementById('billBody');
  tbody.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-3">${item.name}</td>
      <td class="p-3">${item.qty}</td>
      <td class="p-3">₹${item.price.toFixed(2)}</td>
      <td class="p-3">₹${item.total.toFixed(2)}</td>
      <td class="p-3"><button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removeItem(index) {
  items.splice(index, 1);
  updateTable();
  updateTotals();
}

function updateTotals() {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  document.getElementById('subTotal').textContent = subtotal.toFixed(2);
  document.getElementById('gst').textContent = gst.toFixed(2);
  document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}

function resetBill() {
  items = [];
  updateTable();
  updateTotals();
}

function printBill() {
  window.print();
}