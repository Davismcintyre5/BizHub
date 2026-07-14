import { useState, useEffect } from 'react';
import { getOrderStats } from '../../api/resto/orders';
import { getTransactionStats } from '../../api/resto/transactions';
import { getExpenseStats } from '../../api/resto/expenses';
import { getStockStats } from '../../api/resto/stock';
import { Card } from '../../components/ui/Card';
import { Spinner } from '../../components/ui/Spinner';
import { formatCurrency } from '../../utils/format';
import { Utensils, ShoppingCart, Wallet, Package, TrendingUp, AlertTriangle, Users, Calendar } from 'lucide-react';
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orders, transactions, expenses, stock] = await Promise.all([
          getOrderStats(),
          getTransactionStats(),
          getExpenseStats(),
          getStockStats()
        ]);
        setStats({
          orders: orders?.data || {},
          transactions: transactions?.data || {},
          expenses: expenses?.data || {},
          stock: stock?.data || {}
        });
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();

    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const todayOrders = stats?.orders?.todayOrders || 0;
  const todayRevenue = stats?.transactions?.todayRevenue || 0;
  const todayExpenses = stats?.expenses?.today?.total || 0;
  const lowStock = stats?.stock?.lowStock || 0;
  const monthRevenue = stats?.transactions?.monthRevenue || 0;
  const totalCustomers = 0; // Will be fetched from customer stats

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{getGreeting()}</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-xs text-gray-400 mt-1">
          {time.toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {time.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary-500/10 rounded-bl-full" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-3">
              <ShoppingCart size={20} className="text-primary-600" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{todayOrders}</p>
            <p className="text-xs text-gray-500 mt-1">Today's Orders</p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <p className="text-3xl font-extrabold text-green-600">{formatCurrency(todayRevenue)}</p>
            <p className="text-xs text-gray-500 mt-1">Today's Revenue</p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3">
              <Wallet size={20} className="text-red-600" />
            </div>
            <p className="text-3xl font-extrabold text-red-600">{formatCurrency(todayExpenses)}</p>
            <p className="text-xs text-gray-500 mt-1">Today's Expenses</p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-3">
              <AlertTriangle size={20} className="text-yellow-600" />
            </div>
            <p className="text-3xl font-extrabold text-yellow-600">{lowStock}</p>
            <p className="text-xs text-gray-500 mt-1">Low Stock Items</p>
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Utensils size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Monthly Revenue</h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Revenue</span>
              <span className="font-bold text-green-600">{formatCurrency(monthRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-bold">{stats?.orders?.total || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Active Employees</span>
              <span className="font-bold">{stats?.employees?.active || 0}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Package size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">Stock Overview</h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Items</span>
              <span className="font-bold">{stats?.stock?.total || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Low Stock</span>
              <span className="font-bold text-yellow-600">{stats?.stock?.lowStock || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Out of Stock</span>
              <span className="font-bold text-red-600">{stats?.stock?.outOfStock || 0}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Calendar size={20} className="text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold">Quick Actions</h3>
            </div>
          </div>
          <div className="space-y-2">
            <a href="/resto/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <ShoppingCart size={18} className="text-blue-500" />
              <div>
                <p className="text-sm font-medium">New Order</p>
                <p className="text-xs text-gray-500">Create customer order</p>
              </div>
            </a>
            <a href="/resto/menu" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Utensils size={18} className="text-green-500" />
              <div>
                <p className="text-sm font-medium">Manage Menu</p>
                <p className="text-xs text-gray-500">Add or edit menu items</p>
              </div>
            </a>
            <a href="/resto/reservations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Calendar size={18} className="text-purple-500" />
              <div>
                <p className="text-sm font-medium">New Reservation</p>
                <p className="text-xs text-gray-500">Book a table</p>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}