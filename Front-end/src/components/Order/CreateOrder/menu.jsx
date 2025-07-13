const Menu = ({ menu }) => {
  return (
    <div
      className="card text-light rounded-3 shadow-sm p-3 border-0"
      style={{ backgroundColor: '#212529', cursor: 'pointer' }}
    >
      <div className="d-flex align-items-center justify-content-between">
        {/* Icon and Category */}
        <div className="d-flex align-items-center">
          <span
            className="me-3 text-warning"
            dangerouslySetInnerHTML={{ __html: menu.icon || '' }}
            style={{ fontSize: '1.5rem', minWidth: '36px', textAlign: 'center' }}
          />
          <h5 className="mb-0 fw-bold">{menu.category}</h5>
        </div>

        {/* Item count */}
        <div className="text-warning small fw-semibold">
          {menu.item} Item{menu.item > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default Menu;
