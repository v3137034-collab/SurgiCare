import React, { useState } from 'react';
import { Package, ShoppingCart, Search, CheckCircle2, Truck, Clock, ShieldCheck, Plus, X, ArrowRight } from 'lucide-react';

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function ProductsOrdersModule({ user, orders, setOrders, products, initialTab = 'products' }) {
  const isAdmin = user.role === 'admin';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [q, setQ] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderingProduct, setOrderingProduct] = useState(null);
  const [orderQty, setOrderQty] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState(isAdmin ? 'Central Hospital Supply Depo' : 'Ward 4B, Apex Surgical Center');
  const [notice, setNotice] = useState('');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchQ = p.name.toLowerCase().includes(q.toLowerCase()) || (p.description && p.description.toLowerCase().includes(q.toLowerCase()));
    return matchCat && matchQ;
  });

  const userOrders = isAdmin
    ? orders
    : orders.filter(o => o.email === user.email || o.customer.toLowerCase() === user.name.toLowerCase() || o.customer === 'Amit Kumar');

  function triggerNotice(msg) {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  }

  function handleOpenOrderModal(p) {
    setOrderingProduct(p);
    setOrderQty(1);
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (!deliveryAddress.trim()) {
      alert('Please specify a delivery location or hospital ward.');
      return;
    }
    const orderId = 'ORD' + String(Date.now()).slice(-4);
    const totalAmount = orderingProduct.price * orderQty;

    const newOrder = {
      id: orderId,
      customer: user.name,
      email: user.email,
      item: orderingProduct.name,
      amount: totalAmount,
      quantity: orderQty,
      status: 'Processing',
      date: new Date().toISOString().split('T')[0],
      address: deliveryAddress
    };

    setOrders(old => [newOrder, ...old]);
    setOrderingProduct(null);
    setActiveTab('orders');
    triggerNotice(`Order #${orderId} for "${orderingProduct.name}" placed successfully!`);
  }

  function updateOrderStatus(orderId, newStatus) {
    setOrders(old => old.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    triggerNotice(`Order #${orderId} marked as "${newStatus}".`);
  }

  function getStepIndex(status) {
    switch (status) {
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      case 'Cancelled': return -1;
      default: return 0;
    }
  }

  return (
    <div className="stack">
      {/* Header */}
      <div className="heading">
        <div>
          <label>MODEL 2 · CORE WORKING MODULE</label>
          <h1>Surgical Equipment Store & Order Management</h1>
          <p>
            {isAdmin
              ? 'Manage hospital inventory orders, track shipment fulfillment, and review supply demand.'
              : 'Procure authentic surgical disposables, kits, and instruments with live tracking.'}
          </p>
        </div>
        <div className="subnav-tabs">
          <button
            type="button"
            className={'tabbtn ' + (activeTab === 'products' ? 'active' : '')}
            onClick={() => setActiveTab('products')}
          >
            <Package size={15} /> Equipment Catalog ({products.length})
          </button>
          <button
            type="button"
            className={'tabbtn ' + (activeTab === 'orders' ? 'active' : '')}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingCart size={15} /> {isAdmin ? 'All Orders' : 'My Orders'} ({userOrders.length})
          </button>
        </div>
      </div>

      {notice && <div className="success">{notice}</div>}

      {/* View 1: Products Store */}
      {activeTab === 'products' && (
        <section className="panel">
          <div className="panelhead">
            <div>
              <h3>Surgical Supplies & Disposables Catalog</h3>
              <p>Certified medical-grade surgical equipment ready for requisition</p>
            </div>
          </div>

          <div className="filters">
            <div className="filtersearch">
              <Search size={16} />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search equipment, masks, drapes, scissors..."
              />
            </div>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.map(p => (
              <article key={p.id || p.name} className="product-card">
                <div className="product-card-top">
                  <span className="cat-badge">{p.category || 'Supplies'}</span>
                  <span className="stock-badge">✓ In Stock ({p.stock || 45})</span>
                </div>
                <div className="product-icon-wrap">
                  <Package size={26} />
                </div>
                <h4>{p.name}</h4>
                <p className="product-desc">{p.description || 'Sterile clinical-grade equipment for operating rooms.'}</p>
                <div className="product-card-bottom">
                  <div>
                    <span className="price-tag">{money(p.price)}</span>
                    <small className="sold-note">{p.sold} units ordered</small>
                  </div>
                  <button className="primary small" onClick={() => handleOpenOrderModal(p)}>
                    Order Supply
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!filteredProducts.length && <p className="empty">No surgical products matched your filter.</p>}
        </section>
      )}

      {/* View 2: Orders Tracking */}
      {activeTab === 'orders' && (
        <div className="stack">
          {/* Order Cards with Visual Tracking Stepper */}
          <section className="panel">
            <div className="panelhead">
              <div>
                <h3>{isAdmin ? 'Hospital Supply Orders & Fulfillment' : 'Order Tracking & Delivery Status'}</h3>
                <p>Live progress tracking for surgical supplies</p>
              </div>
            </div>

            <div className="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer / Ward</th>
                    <th>Item Ordered</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Delivery Status</th>
                    {isAdmin && <th>Manage Status</th>}
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map(o => {
                    const step = getStepIndex(o.status);
                    return (
                      <tr key={o.id}>
                        <td><b>{o.id}</b></td>
                        <td>
                          <b>{o.customer}</b>
                          <small>{o.address || 'Central OT Store'}</small>
                        </td>
                        <td>{o.item}</td>
                        <td><b>{o.quantity || 1}</b></td>
                        <td><b>{money(o.amount)}</b></td>
                        <td>{o.date}</td>
                        <td>
                          <span className={'badge ' + o.status.toLowerCase()}>{o.status}</span>
                        </td>
                        {isAdmin && (
                          <td>
                            <select
                              value={o.status}
                              onChange={e => updateOrderStatus(o.id, e.target.value)}
                              style={{ height: '32px', fontSize: '11px', padding: '0 6px' }}
                            >
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!userOrders.length && <p className="empty">No orders recorded yet.</p>}
            </div>
          </section>

          {/* Stepper Card for Latest Order */}
          {userOrders.length > 0 && userOrders[0].status !== 'Cancelled' && (
            <section className="panel">
              <div className="panelhead">
                <div>
                  <h3>Active Shipment Tracker: Order #{userOrders[0].id}</h3>
                  <p>{userOrders[0].item} · Destination: {userOrders[0].address || 'Main Campus'}</p>
                </div>
              </div>

              <div className="stepper-wrap">
                <div className={`step-node ${getStepIndex(userOrders[0].status) >= 0 ? 'done' : ''}`}>
                  <div className="step-circle"><Clock size={16} /></div>
                  <b>Order Placed</b>
                  <small>{userOrders[0].date}</small>
                </div>
                <div className={`step-line ${getStepIndex(userOrders[0].status) >= 1 ? 'done' : ''}`} />
                <div className={`step-node ${getStepIndex(userOrders[0].status) >= 1 ? 'done' : ''}`}>
                  <div className="step-circle"><Package size={16} /></div>
                  <b>Processing</b>
                  <small>Sterilization & Packing</small>
                </div>
                <div className={`step-line ${getStepIndex(userOrders[0].status) >= 2 ? 'done' : ''}`} />
                <div className={`step-node ${getStepIndex(userOrders[0].status) >= 2 ? 'done' : ''}`}>
                  <div className="step-circle"><Truck size={16} /></div>
                  <b>Dispatched</b>
                  <small>In Transit to OT</small>
                </div>
                <div className={`step-line ${getStepIndex(userOrders[0].status) >= 3 ? 'done' : ''}`} />
                <div className={`step-node ${getStepIndex(userOrders[0].status) >= 3 ? 'done' : ''}`}>
                  <div className="step-circle"><CheckCircle2 size={16} /></div>
                  <b>Delivered</b>
                  <small>Received at ward</small>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* Order Placement Modal */}
      {orderingProduct && (
        <div className="overlay" onClick={() => setOrderingProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modalhead">
              <div>
                <label>SURGICAL STORE ORDER</label>
                <h2>Order Medical Supplies</h2>
              </div>
              <button onClick={() => setOrderingProduct(null)}><X /></button>
            </div>

            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#f7faff', padding: '14px', borderRadius: '10px', border: '1px solid #e2edfa' }}>
                <b style={{ fontSize: '13px', color: '#163f66' }}>{orderingProduct.name}</b>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px' }}>
                  <span style={{ color: '#68859e' }}>Category: {orderingProduct.category}</span>
                  <b>{money(orderingProduct.price)} / unit</b>
                </div>
              </div>

              <div>
                <label className="field-label">Quantity</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    className="secondary"
                    style={{ padding: '6px 14px' }}
                    onClick={() => setOrderQty(q => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={orderQty}
                    onChange={e => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: '70px', textAlign: 'center', height: '38px', borderRadius: '8px', border: '1px solid #dce6f0' }}
                  />
                  <button
                    type="button"
                    className="secondary"
                    style={{ padding: '6px 14px' }}
                    onClick={() => setOrderQty(q => q + 1)}
                  >
                    +
                  </button>
                  <span style={{ marginLeft: 'auto', fontWeight: '800', fontSize: '14px', color: '#102f50' }}>
                    Total: {money(orderingProduct.price * orderQty)}
                  </span>
                </div>
              </div>

              <div>
                <label className="field-label">Delivery Location / Hospital Ward</label>
                <input
                  type="text"
                  className="modal-input"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="E.g. Ward 3A, Room 104, or Residential Address"
                  required
                />
              </div>

              <div>
                <label className="field-label">Demo Payment Channel</label>
                <select defaultValue="cod">
                  <option value="cod">Hospital Billing / Cash on Delivery (Demo)</option>
                  <option value="insurance">Direct Insurance Claim (Demo)</option>
                  <option value="card">UPI / Medical Credit Card (Demo)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="primary wide">
                  Place Order ({money(orderingProduct.price * orderQty)})
                </button>
                <button type="button" className="secondary wide" onClick={() => setOrderingProduct(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
