import { useState, useEffect } from 'react';
import { Link2, Unlink, RefreshCw, CheckCircle, XCircle, AlertCircle, Download, Search } from 'lucide-react';
import { 
  linkMT5Account, 
  getMT5Status, 
  unlinkMT5Account, 
  toggleMT5Sync,
  manualSyncMT5,
  getMT5Brokers
} from '../api/client';

export default function MT5Settings() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    server: '',
    password: ''
  });
  const [mt5Status, setMt5Status] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [brokers, setBrokers] = useState([]);
  const [servers, setServers] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState('');
  const [serverSearch, setServerSearch] = useState('');
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [useCustomServer, setUseCustomServer] = useState(false);

  useEffect(() => {
    loadMT5Status();
    loadBrokers();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showServerDropdown && !event.target.closest('.server-dropdown-container')) {
        setShowServerDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showServerDropdown]);

  const loadBrokers = async () => {
    try {
      const data = await getMT5Brokers();
      setBrokers(data.brokers || []);
      setServers(data.servers || []);
    } catch (err) {
      console.error('Failed to load brokers:', err);
    }
  };

  const loadMT5Status = async () => {
    try {
      setLoadingStatus(true);
      const status = await getMT5Status();
      setMt5Status(status);
    } catch (err) {
      console.error('Failed to load MT5 status:', err);
      setError('Failed to load MT5 account status');
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBrokerSelect = (brokerName) => {
    setSelectedBroker(brokerName);
    setUseCustomServer(false);
    setServerSearch('');
    setShowServerDropdown(true);
  };

  const handleServerSelect = (serverName) => {
    setFormData(prev => ({ ...prev, server: serverName }));
    setShowServerDropdown(false);
    setServerSearch('');
  };

  const filteredServers = servers.filter(server => {
    if (!serverSearch) return true;
    const searchLower = serverSearch.toLowerCase();
    return (
      server.server.toLowerCase().includes(searchLower) ||
      server.broker.toLowerCase().includes(searchLower)
    );
  });

  const brokerServers = selectedBroker 
    ? servers.filter(s => s.broker === selectedBroker)
    : filteredServers;

  const handleLink = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await linkMT5Account(formData);
      setSuccess('MT5 account linked successfully!');
      setFormData({ accountNumber: '', server: '', password: '' });
      await loadMT5Status();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to link MT5 account';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlink = async () => {
    if (!window.confirm('Are you sure you want to unlink your MT5 account? This will stop automatic syncing.')) {
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await unlinkMT5Account();
      setSuccess('MT5 account unlinked successfully');
      await loadMT5Status();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to unlink MT5 account';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSync = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const newStatus = !mt5Status.syncEnabled;
      await toggleMT5Sync(newStatus);
      setSuccess(`Auto-sync ${newStatus ? 'enabled' : 'disabled'}`);
      await loadMT5Status();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to toggle sync';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSync = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await manualSyncMT5();
      setSuccess(result.message || 'Manual sync triggered');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to trigger manual sync';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading MT5 settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MT5 Account Integration</h1>
          <p className="text-gray-600">
            Link your MetaTrader 5 account to automatically sync trades to your journal.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        {mt5Status?.isLinked ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">MT5 Account Linked</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Account:</span> {mt5Status.accountNumber}</p>
                  <p><span className="font-medium">Server:</span> {mt5Status.server}</p>
                  {mt5Status.lastSync && (
                    <p><span className="font-medium">Last Sync:</span> {new Date(mt5Status.lastSync).toLocaleString()}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {mt5Status.syncEnabled ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-3">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Auto-sync Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mr-3">
                    <XCircle className="h-4 w-4 mr-1" />
                    Auto-sync Disabled
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleToggleSync}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {mt5Status.syncEnabled ? 'Disable' : 'Enable'} Auto-sync
              </button>
              <button
                onClick={handleManualSync}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Manual Sync
              </button>
              <button
                onClick={handleUnlink}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Unlink className="h-4 w-4 mr-2" />
                Unlink Account
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Link MT5 Account</h2>
            <form onSubmit={handleLink} className="space-y-4">
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  required
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your MT5 account number"
                />
              </div>

              <div>
                <label htmlFor="broker" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Broker
                </label>
                <div className="mb-3">
                  <select
                    id="broker"
                    value={selectedBroker}
                    onChange={(e) => handleBrokerSelect(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">-- Select a broker --</option>
                    {brokers.map((broker) => (
                      <option key={broker.name} value={broker.name}>
                        {broker.name}
                      </option>
                    ))}
                  </select>
                </div>

                <label htmlFor="server" className="block text-sm font-medium text-gray-700 mb-1">
                  Server {selectedBroker && <span className="text-xs text-gray-500">({selectedBroker})</span>}
                </label>
                
                <div className="relative server-dropdown-container">
                  {!useCustomServer ? (
                    <>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={serverSearch}
                            onChange={(e) => {
                              setServerSearch(e.target.value);
                              setShowServerDropdown(true);
                            }}
                            onFocus={() => setShowServerDropdown(true)}
                            placeholder={selectedBroker ? `Search ${selectedBroker} servers...` : "Search for server..."}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setUseCustomServer(true);
                            setFormData(prev => ({ ...prev, server: '' }));
                            setShowServerDropdown(false);
                          }}
                          className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 border border-indigo-300 rounded-md hover:bg-indigo-50 whitespace-nowrap"
                        >
                          Custom
                        </button>
                      </div>

                      {showServerDropdown && brokerServers.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          {brokerServers.map((serverItem) => (
                            <button
                              key={serverItem.server}
                              type="button"
                              onClick={() => handleServerSelect(serverItem.server)}
                              className="w-full text-left px-4 py-2 hover:bg-indigo-50 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900">{serverItem.server}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  serverItem.isDemo 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {serverItem.isDemo ? 'Demo' : 'Live'}
                                </span>
                              </div>
                              {!selectedBroker && (
                                <div className="text-xs text-gray-500 mt-1">{serverItem.broker}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {showServerDropdown && brokerServers.length === 0 && serverSearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 text-center text-gray-500 text-sm">
                          No servers found. Try a different search or use custom server.
                        </div>
                      )}

                      {formData.server && (
                        <div className="mt-2 p-2 bg-indigo-50 border border-indigo-200 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-indigo-900">Selected: {formData.server}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, server: '' }));
                                setServerSearch('');
                              }}
                              className="text-xs text-indigo-600 hover:text-indigo-700"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <input
                        id="server"
                        name="server"
                        type="text"
                        required
                        value={formData.server}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter custom server name"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setUseCustomServer(false);
                          setFormData(prev => ({ ...prev, server: '' }));
                        }}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        ← Back to broker list
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Select your broker from the list above, or enter a custom server name if your broker is not listed.
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password (Investor/Read-only recommended)
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your MT5 password"
                />
                <p className="mt-1 text-xs text-gray-500">
                  For security, use an investor/read-only password, not your main trading password.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Link2 className="h-4 w-4 mr-2" />
                {loading ? 'Linking...' : 'Link MT5 Account'}
              </button>
            </form>
          </div>
        )}

        {/* Instructions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Sync Trades</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Option 1: MQL5 Expert Advisor (Recommended)</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Download the MQL5 Expert Advisor from the link below</li>
                <li>Install it in your MT5 terminal: File → Open Data Folder → MQL5 → Experts</li>
                <li>Restart MT5 and drag the EA onto your chart</li>
                <li>Configure the EA with your API endpoint and key</li>
                <li>The EA will automatically send trades to your journal</li>
              </ol>
              <div className="mt-3">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('MQL5 EA download link will be provided. Contact support for the EA file.');
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download MQL5 EA
                </a>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Option 2: Manual CSV Import</h3>
              <p className="ml-4">
                Export your trades from MT5 as CSV and upload them through the Dashboard page.
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Security Note</h3>
              <p className="ml-4 text-gray-600">
                Your MT5 credentials are encrypted and stored securely. We recommend using an investor/read-only password 
                for added security. Never share your main trading password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

