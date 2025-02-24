import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { CheckCircle, Mail, Inbox } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: any;
  status: 'read' | 'unread';
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        fetchMessages();
      } else {
        setLoading(false);
        setError('Please log in to view messages.');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const messageList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(messageList);
      setError(null);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    if (!isAuthenticated) {
      setError('Please log in to perform this action.');
      return;
    }

    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        status: 'read'
      });
      // Update local state
      setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
      setError('Failed to mark message as read.');
    }
  };

  // Update parent component's stats
  useEffect(() => {
    const stats = {
      total: messages.length,
      unread: messages.filter(m => m.status === 'unread').length,
      read: messages.filter(m => m.status === 'read').length,
    };

    // Update stats in parent component's cards
    const totalElement = document.querySelector('[data-stat="total"]');
    const unreadElement = document.querySelector('[data-stat="unread"]');
    const readElement = document.querySelector('[data-stat="read"]');

    if (totalElement) totalElement.textContent = stats.total.toString();
    if (unreadElement) unreadElement.textContent = stats.unread.toString();
    if (readElement) readElement.textContent = stats.read.toString();
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
        <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-400">
        Please log in through the admin panel to view messages.
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No messages</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You haven't received any messages yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Messages</h3>
      </div>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white dark:bg-gray-800 rounded-xl border ${
              message.status === 'unread'
                ? 'border-blue-200 dark:border-blue-800 shadow-sm'
                : 'border-gray-200 dark:border-gray-700'
            } transition-all duration-200 hover:shadow-md`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.status === 'unread'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {message.status === 'unread' ? (
                        <Mail className="h-5 w-5" />
                      ) : (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">
                        {message.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {message.timestamp?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {message.email}
                    </p>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </div>
                {message.status === 'unread' && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-lg text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
