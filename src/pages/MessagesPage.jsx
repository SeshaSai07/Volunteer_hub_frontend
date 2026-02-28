import { useState, useEffect, useRef } from 'react';
import { sendMessage, getConversation } from '../api/messageService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import './MessagesPage.css';

const MessagesPage = () => {
    const { user } = useAuth();
    const [otherUserId, setOtherUserId] = useState('');
    const [inputId, setInputId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);

    const loadConversation = async (uid) => {
        if (!uid) return;
        setLoading(true);
        try {
            const res = await getConversation(uid);
            setMessages(res.data || []);
            setOtherUserId(uid);
        } catch { toast.error('Could not load conversation'); }
        finally { setLoading(false); }
    };

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMsg.trim() || !otherUserId) return;
        try {
            await sendMessage({ receiverId: otherUserId, content: newMsg.trim() });
            setNewMsg('');
            await loadConversation(otherUserId);
        } catch (err) { toast.error(err.response?.data?.error || 'Failed to send'); }
    };

    return (
        <div className="page-container messages-page">
            <h1 className="section-title">Messages</h1>

            <div className="msg-search-bar">
                <input className="form-control" placeholder="Enter User ID to start conversation..."
                    value={inputId} onChange={e => setInputId(e.target.value)} />
                <button className="btn btn-primary" onClick={() => loadConversation(inputId)}>Open Chat</button>
            </div>

            {otherUserId && (
                <div className="chat-box card">
                    <div className="chat-header">
                        <span>Conversation · <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>{otherUserId}</span></span>
                    </div>
                    <div className="chat-messages">
                        {loading ? <div className="loading-screen"><div className="spinner" /></div> : (
                            messages.length === 0
                                ? <div className="empty-state"><p>No messages yet. Say hello!</p></div>
                                : messages.map(m => (
                                    <div key={m.id} className={`chat-msg ${m.sender_id === user?.id ? 'mine' : 'theirs'}`}>
                                        <div className="chat-bubble">{m.content}</div>
                                        <span className="chat-time">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                ))
                        )}
                        <div ref={endRef} />
                    </div>
                    <form className="chat-input" onSubmit={handleSend}>
                        <input className="form-control" placeholder="Type a message..." value={newMsg}
                            onChange={e => setNewMsg(e.target.value)} />
                        <button type="submit" className="btn btn-primary"><Send size={16} /></button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
