"use client";
import StateCard from "@/components/StateCard";
import { motion } from "framer-motion";
import { Edit, RotateCcw, Trash2, UserCheck, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Client {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  image?: string;
}

const UsersPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/data/data.json");
        const data = await res.json();
        setClients(data.clients);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          <StateCard
            name="Total Clients"
            icon={UserIcon}
            value="7,670"
            description="+12.3% from last month"
            trend="up"
            trendValue="12.3%"
          />
          <StateCard
            name="New Clients"
            icon={UserIcon}
            value="860"
            description="+8.7% from last month"
            trend="up"
            trendValue="8.7%"
          />
          <StateCard
            name="Active Clients"
            icon={UserCheck}
            value="6,420"
            description="+15.2% from last month"
            trend="up"
            trendValue="15.2%"
          />
          <StateCard
            name="Returning Clients"
            icon={RotateCcw}
            value="4,230"
            description="+6.8% from last month"
            trend="up"
            trendValue="6.8%"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-border"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground text-center sm:text-left">
              Clients
            </h2>
          </div>

          <div className="relative w-full sm:w-auto mb-6">
            <input
              type="text"
              placeholder="Search Clients"
              className="bg-muted text-foreground placeholder-muted-foreground rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 text-sm"
            />
            <UserIcon
              className="absolute left-3 top-2.5 text-muted-foreground"
              size={18}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Phone Number
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Country
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </td>
                  </tr>
                ) : (
                  clients.map((client, index) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex flex-col sm:table-row mb-4 sm:mb-0 border-b sm:border-b-0 border-border sm:border-none p-2 sm:p-0"
                    >
                      {/* Mobile view */}
                      <td className="sm:hidden px-3 py-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-foreground">
                                {client.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {client.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="text-primary hover:text-primary/80 transition duration-200 p-2 rounded hover:bg-primary/10"
                              title="Edit client"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-destructive hover:text-destructive/80 transition duration-200 p-2 rounded hover:bg-destructive/10"
                              title="Delete client"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                      {/* Desktop view */}
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-foreground">
                              {client.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {client.email}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {client.phoneNumber}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {client.country}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <div className="flex items-center justify-start gap-2">
                          <button
                            className="text-primary hover:text-primary/80 transition duration-200 p-2 rounded hover:bg-primary/10"
                            title="Edit client"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-destructive hover:text-destructive/80 transition duration-200 p-2 rounded hover:bg-destructive/10"
                            title="Delete client"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UsersPage;
