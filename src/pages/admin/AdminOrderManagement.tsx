import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  CheckCircle,
  TruckIcon,
  PackageCheck,
  Clock,
  Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { toast } from 'sonner';

// Dummy order data
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  whatsappNumber: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

interface NewOrderForm {
  customerName: string;
  whatsappNumber: string;
  address: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

const dummyOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Muhammad Ali',
    whatsappNumber: '+923001234567',
    address: 'House 123, Street 4, Gulberg III, Lahore',
    items: [
      { id: '1', name: 'MacBook Pro 16-inch', price: 249999, quantity: 1 },
    ],
    total: 249999,
    status: 'pending',
    date: '2023-06-12T08:30:00.000Z',
  },
  {
    id: 'ORD-002',
    customerName: 'Fatima Khan',
    whatsappNumber: '+923215678901',
    address: 'Flat 4B, Saima Mall, Clifton, Karachi',
    items: [
      { id: '2', name: 'Dell XPS 15', price: 189999, quantity: 1 },
      { id: '3', name: 'HP Spectre x360', price: 159999, quantity: 1 },
    ],
    total: 349998,
    status: 'processing',
    date: '2023-06-10T10:15:00.000Z',
  },
  {
    id: 'ORD-003',
    customerName: 'Ahmed Hassan',
    whatsappNumber: '+923331234567',
    address: 'House 78, Phase 2, DHA, Islamabad',
    items: [
      { id: '3', name: 'HP Spectre x360', price: 159999, quantity: 2 },
    ],
    total: 319998,
    status: 'shipped',
    date: '2023-06-08T14:45:00.000Z',
  },
  {
    id: 'ORD-004',
    customerName: 'Zainab Omar',
    whatsappNumber: '+923451234567',
    address: 'House 45, Block B, Model Town, Lahore',
    items: [
      { id: '1', name: 'MacBook Pro 16-inch', price: 249999, quantity: 1 },
    ],
    total: 249999,
    status: 'delivered',
    date: '2023-06-05T09:20:00.000Z',
  },
];

const AdminOrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdateOrder, setStatusUpdateOrder] = useState<Order | null>(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState<NewOrderForm>({
    customerName: '',
    whatsappNumber: '',
    address: '',
    items: [{ name: '', price: 0, quantity: 1 }]
  });

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = () => {
      setLoading(true);
      setTimeout(() => {
        setOrders(dummyOrders);
        setLoading(false);
      }, 1000);
    };
    
    fetchOrders();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleStatusUpdate = (order: Order) => {
    setStatusUpdateOrder(order);
  };

  const updateOrderStatus = (status: Order['status']) => {
    if (!statusUpdateOrder) return;
    
    // In a real app, this would make an API call to update the order status
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === statusUpdateOrder.id 
          ? { ...order, status } 
          : order
      )
    );
    
    setStatusUpdateOrder(null);
    toast.success(`Order status updated to ${status}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof NewOrderForm) => {
    setNewOrderForm({
      ...newOrderForm,
      [field]: e.target.value
    });
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = [...newOrderForm.items];
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: typeof value === 'string' && field === 'price' ? parseFloat(value) || 0 : value 
    };
    
    setNewOrderForm({
      ...newOrderForm,
      items: updatedItems
    });
  };

  const addItemField = () => {
    setNewOrderForm({
      ...newOrderForm,
      items: [...newOrderForm.items, { name: '', price: 0, quantity: 1 }]
    });
  };

  const removeItemField = (index: number) => {
    if (newOrderForm.items.length === 1) return;
    
    const updatedItems = [...newOrderForm.items];
    updatedItems.splice(index, 1);
    
    setNewOrderForm({
      ...newOrderForm,
      items: updatedItems
    });
  };

  const calculateTotal = () => {
    return newOrderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCreateOrder = () => {
    // Validate form
    if (!newOrderForm.customerName.trim() || !newOrderForm.whatsappNumber.trim() || !newOrderForm.address.trim()) {
      toast.error("Please fill all customer information fields");
      return;
    }

    if (newOrderForm.items.some(item => !item.name.trim() || item.price <= 0)) {
      toast.error("Please fill all item details correctly");
      return;
    }

    // Generate new order ID
    const newOrderId = `ORD-${(orders.length + 1).toString().padStart(3, '0')}`;
    
    // Create new order
    const newOrder: Order = {
      id: newOrderId,
      customerName: newOrderForm.customerName,
      whatsappNumber: newOrderForm.whatsappNumber,
      address: newOrderForm.address,
      items: newOrderForm.items.map((item, index) => ({
        id: (index + 1).toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: calculateTotal(),
      status: 'pending',
      date: new Date().toISOString()
    };
    
    // Add new order to list
    setOrders([newOrder, ...orders]);
    
    // Reset form and close modal
    setNewOrderForm({
      customerName: '',
      whatsappNumber: '',
      address: '',
      items: [{ name: '', price: 0, quantity: 1 }]
    });
    setShowNewOrderModal(false);
    
    toast.success("New order created successfully");
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.whatsappNumber.includes(searchTerm)
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (sortField === 'total') {
        return sortDirection === 'asc' 
          ? a.total - b.total
          : b.total - a.total;
      } else if (sortField === 'date') {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      return 0;
    });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <PackageCheck className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <PrimaryButton 
          onClick={() => setShowNewOrderModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Order
        </PrimaryButton>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search orders..."
            className="pl-10"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded max-w-[500px] mx-auto mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded max-w-[470px] mx-auto mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded max-w-[430px] mx-auto"></div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      Order ID
                      {sortField === 'id' && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="ml-1 h-4 w-4" /> : 
                          <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('customerName')}
                  >
                    <div className="flex items-center">
                      Customer
                      {sortField === 'customerName' && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="ml-1 h-4 w-4" /> : 
                          <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('total')}
                  >
                    <div className="flex items-center">
                      Total
                      {sortField === 'total' && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="ml-1 h-4 w-4" /> : 
                          <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="ml-1 h-4 w-4" /> : 
                          <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === 'date' && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="ml-1 h-4 w-4" /> : 
                          <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      {searchTerm ? (
                        <div>
                          <p className="text-gray-500">No orders match your search term</p>
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="text-primary hover:text-primary/80 mt-2"
                          >
                            Clear search
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500">No orders found</p>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>Rs. {order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{getStatusLabel(order.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="View Order"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(order)}
                            className="p-1 text-purple-600 hover:text-purple-800"
                            title="Update Status"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Order Details - {selectedOrder.id}
              </h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-1">Customer Information</h4>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p className="text-gray-700">{selectedOrder.whatsappNumber}</p>
                  <p className="text-gray-700">{selectedOrder.address}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-1">Order Information</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-700">Status:</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedOrder.status)}
                      <span className="capitalize">{getStatusLabel(selectedOrder.status)}</span>
                    </div>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    <span>{new Date(selectedOrder.date).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Order Items</h4>
              <div className="border rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Rs. {item.price.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                        Total:
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">
                        Rs. {selectedOrder.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <PrimaryButton onClick={() => setSelectedOrder(null)}>
                  Close
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Status Update Modal */}
      {statusUpdateOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h3>
            <p className="mb-6 text-gray-700">
              Select a new status for order <span className="font-medium">{statusUpdateOrder.id}</span>
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => updateOrderStatus('pending')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  statusUpdateOrder.status === 'pending' 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 hover:border-yellow-500 hover:bg-yellow-50'
                }`}
              >
                <Clock className="h-8 w-8 text-yellow-500 mb-2" />
                <span className="font-medium">Pending</span>
              </button>
              
              <button
                onClick={() => updateOrderStatus('processing')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  statusUpdateOrder.status === 'processing' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <CheckCircle className="h-8 w-8 text-blue-500 mb-2" />
                <span className="font-medium">Processing</span>
              </button>
              
              <button
                onClick={() => updateOrderStatus('shipped')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  statusUpdateOrder.status === 'shipped' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                }`}
              >
                <TruckIcon className="h-8 w-8 text-purple-500 mb-2" />
                <span className="font-medium">Shipped</span>
              </button>
              
              <button
                onClick={() => updateOrderStatus('delivered')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  statusUpdateOrder.status === 'delivered' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                }`}
              >
                <PackageCheck className="h-8 w-8 text-green-500 mb-2" />
                <span className="font-medium">Delivered</span>
              </button>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setStatusUpdateOrder(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Create New Order
              </h3>
              <button 
                onClick={() => setShowNewOrderModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Customer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        id="customerName"
                        value={newOrderForm.customerName}
                        onChange={(e) => handleInputChange(e, 'customerName')}
                        placeholder="Customer full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                        WhatsApp Number
                      </label>
                      <Input
                        id="whatsappNumber"
                        value={newOrderForm.whatsappNumber}
                        onChange={(e) => handleInputChange(e, 'whatsappNumber')}
                        placeholder="+923001234567"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Shipping Address
                    </label>
                    <textarea
                      id="address"
                      value={newOrderForm.address}
                      onChange={(e) => handleInputChange(e, 'address')}
                      placeholder="Complete shipping address"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                {/* Order Items */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Order Items</h4>
                    <button 
                      onClick={addItemField}
                      className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Item
                    </button>
                  </div>
                  
                  {newOrderForm.items.map((item, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h5 className="text-sm font-medium">Item #{index + 1}</h5>
                        {newOrderForm.items.length > 1 && (
                          <button
                            onClick={() => removeItemField(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Product Name
                          </label>
                          <Input
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            placeholder="Product name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Price (Rs.)
                          </label>
                          <Input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                            placeholder="1"
                            min="1"
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-right text-sm font-medium text-gray-700">
                        Subtotal: Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 text-right text-lg font-bold">
                    Total: Rs. {calculateTotal().toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <PrimaryButton onClick={handleCreateOrder}>
                  Create Order
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
