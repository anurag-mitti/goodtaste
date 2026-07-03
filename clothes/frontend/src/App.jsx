import { useState, useEffect } from 'react'
import axios from 'axios'
import { Image as ImageIcon, Link as LinkIcon, Camera, Globe, Plus, Search, ExternalLink, Copy, Check, Upload } from 'lucide-react'

const API_BASE = 'http://127.0.0.1:5000/api'

function App() {
  const [links, setLinks] = useState([])
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [urlsInput, setUrlsInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/links`)
      setLinks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchLinks()
    const interval = setInterval(fetchLinks, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleProcessUrls = async () => {
    if (!urlsInput.trim()) return
    setIsProcessing(true)
    const urls = urlsInput.split('\n').filter(u => u.trim())
    try {
      await axios.post(`${API_BASE}/process-urls`, { urls })
      setUrlsInput('')
      await fetchLinks()
    } catch (err) {
      console.error(err)
    }
    setIsProcessing(false)
  }

  const handleImageUpload = async (id, file) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('image', file)
    try {
      await axios.post(`${API_BASE}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      fetchLinks()
    } catch (err) {
      console.error(err)
    }
  }

  const filteredLinks = links.filter(link => {
    if (activeTab !== 'All' && link.category !== activeTab) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return link.title?.toLowerCase().includes(q) || link.url.toLowerCase().includes(q)
    }
    return true
  })

  const tabs = ['All', 'Product', 'Instagram', 'Website']

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header & Input */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          Link Organizer
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Paste a list of URLs below. We'll automatically categorize them and fetch their details.
        </p>
        
        <div className="glass-panel p-4 max-w-3xl mx-auto flex flex-col gap-4">
          <textarea 
            className="glass-input w-full p-4 h-32 resize-none"
            placeholder="Paste URLs here (one per line)..."
            value={urlsInput}
            onChange={e => setUrlsInput(e.target.value)}
          />
          <button 
            className="btn-primary w-full flex items-center justify-center gap-2"
            onClick={handleProcessUrls}
            disabled={isProcessing}
          >
            {isProcessing ? <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" /> : <Plus size={20} />}
            {isProcessing ? 'Processing...' : 'Process URLs'}
          </button>
        </div>
      </div>

      {/* Navigation & Search */}
      <div className="sticky top-4 z-50 glass-panel p-2 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl whitespace-nowrap transition-all ${activeTab === tab ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'hover:bg-white/5 text-gray-400 border border-transparent'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search links..." 
            className="glass-input w-full pl-10 pr-4 py-2"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredLinks.map(link => (
          <LinkCard key={link.id} link={link} onUpload={handleImageUpload} />
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No links found in this category.
        </div>
      )}

    </div>
  )
}

function LinkCard({ link, onUpload }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]){
      onUpload(link.id, e.target.files[0])
    }
  }

  const getHostname = (url) => {
    try { return new URL(url).hostname.replace('www.', '') } catch { return url }
  }

  if (link.category === 'Product') {
    return (
      <div className="glass-card group flex flex-col h-full">
        <div className="relative aspect-[3/4] bg-white/5 border-b border-white/10 flex items-center justify-center overflow-hidden">
          {link.image ? (
             <img src={link.image} alt="Product" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-500">
              <ImageIcon size={48} />
              {link.status === 'pending' ? (
                <span className="text-sm">Scraping...</span>
              ) : (
                <label className="btn-secondary text-sm cursor-pointer flex items-center gap-2">
                  <Upload size={16}/> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              )}
            </div>
          )}
          {link.status === 'failed' && !link.image && <div className="absolute top-2 right-2 bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded border border-red-500/30">Failed</div>}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-purple-400 font-medium mb-2 truncate uppercase tracking-wider">{getHostname(link.url)}</div>
          <h3 className="font-semibold text-gray-100 line-clamp-2 mb-4 leading-tight">{link.title || 'Unknown Product'}</h3>
          <div className="mt-auto flex gap-2">
            <a href={link.url} target="_blank" rel="noreferrer" className="btn-primary flex-1 text-center text-sm flex justify-center items-center gap-2">
              <ExternalLink size={16} /> View
            </a>
            <button onClick={handleCopy} className="btn-secondary p-2 aspect-square flex items-center justify-center">
              {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-4 flex items-center gap-4 col-span-1 md:col-span-2 lg:col-span-2">
      <div className="w-12 h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-purple-400">
        {link.category === 'Instagram' ? <Camera size={24} /> : <Globe size={24} />}
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-gray-100 truncate">{link.title || link.category}</h3>
        <p className="text-sm text-gray-400 truncate">{link.url}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={handleCopy} className="btn-secondary p-2 aspect-square flex items-center justify-center">
          {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
        </button>
        <a href={link.url} target="_blank" rel="noreferrer" className="btn-primary p-2 aspect-square flex items-center justify-center">
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}

export default App
