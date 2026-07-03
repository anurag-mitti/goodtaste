import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import useSWR from 'swr';
import AddLinksModal from '../components/AddLinksModal';
import { ProductsGrid, WebsitesGrid, ReelsGrid, ManualUploadGrid, TrashGrid } from '../components/DashboardSections';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ScrollLines from '../components/Layout/ScrollLines';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const socket = io(API_URL);

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState({
    'Products': [],
    'Websites': [],
    'Reels': [],
    'Requires Manual Upload': [],
    'Trash': []
  });

  const { data: swrData } = useSWR(`${API_URL}/api/urls`, url => fetch(url).then(r => r.json()), { 
    revalidateOnFocus: false
  });

  useEffect(() => {
    if (swrData) {
      const grouped = {
        'Products': [],
        'Websites': [],
        'Reels': [],
        'Requires Manual Upload': [],
        'Trash': []
      };
      swrData.forEach(item => {
        if (grouped[item.category]) {
          grouped[item.category].push(item);
        } else {
          grouped['Requires Manual Upload'].push(item);
        }
      });
      setItems(grouped);
    }
  }, [swrData]);

  const isAdmin = localStorage.getItem('adminToken') === 'mitti_dude';
  const getAuthHeader = () => ({
    'Content-Type': 'application/json',
    'x-admin-password': localStorage.getItem('adminToken') || ''
  });

  useEffect(() => {
    socket.on('url_processed', (data) => {
      if (data.status === 'error') {
        toast.error(`Error processing ${data.url}`);
      } else {
        toast.success(`Categorized as ${data.category}: ${data.title}`);
      }

      setItems(prev => {
        const category = data.category || 'Requires Manual Upload';
        const list = prev[category] || [];
        if (list.find(i => i._id === data._id)) return prev;
        return {
          ...prev,
          [category]: [data, ...list]
        };
      });
    });

    return () => socket.off('url_processed');
  }, []);

  const handleUpdateFields = async (id, updates, currentCategory) => {
    try {
      const res = await fetch(`${API_URL}/api/urls/update`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify({ id, ...updates })
      });
      
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      
      setItems(prev => {
        const list = prev[currentCategory] || [];
        const itemIndex = list.findIndex(i => i._id === id);
        if (itemIndex === -1) return prev;
        
        const itemToUpdate = { ...list[itemIndex], ...updates };
        const newList = [...list];
        
        if (updates.category && updates.category !== currentCategory) {
          newList.splice(itemIndex, 1);
          return {
            ...prev,
            [currentCategory]: newList,
            [updates.category]: [itemToUpdate, ...(prev[updates.category] || [])]
          };
        } else {
          newList[itemIndex] = itemToUpdate;
          return { ...prev, [currentCategory]: newList };
        }
      });
      if (updates.category && updates.category !== currentCategory) {
        toast.success(`Successfully moved to ${updates.category}`);
      } else {
        toast.success('Successfully updated');
      }
    } catch (err) {
      toast.error(`Failed to update: ${err.message}`);
    }
  };

  const handleDelete = async (id, currentCategory) => {
    try {
      const res = await fetch(`${API_URL}/api/urls/delete`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ id })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      setItems(prev => {
        const list = prev[currentCategory] || [];
        const itemIndex = list.findIndex(i => i._id === id);
        if (itemIndex === -1) return prev;
        
        const itemToMove = list[itemIndex];
        const newList = [...list];
        newList.splice(itemIndex, 1);
        
        return {
          ...prev,
          [currentCategory]: newList,
          'Trash': [itemToMove, ...(prev['Trash'] || [])]
        };
      });
      toast('Item moved to Trash');
    } catch (err) {
      toast.error(`Failed to delete item: ${err.message}`);
    }
  };

  const handleClearTrash = async () => {
    try {
      const res = await fetch(`${API_URL}/api/urls/clear-trash`, {
        method: 'POST',
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error('Failed to clear trash');
      
      setItems(prev => ({
        ...prev,
        'Trash': []
      }));
      toast.success('Trash emptied successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground flex flex-col relative"
    >
      <ScrollLines />
      <Toaster position="bottom-right" richColors theme="dark" />
      <Header onAddLinks={() => setIsModalOpen(true)} />
      
      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-8 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient">Your Curation Engine</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">Auto-categorize, extract metadata, and manage your fashion inspiration seamlessly across the web.</p>
        </motion.div>
          <Tabs defaultValue="Products" className="w-full max-w-full">
            <div className="relative">
              <TabsList className="flex h-auto w-full overflow-x-auto justify-start mb-8 glass p-1 rounded-xl hide-scrollbar">
                <TabsTrigger value="Products" className="flex-shrink-0 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Products ({items['Products'].length})</TabsTrigger>
                <TabsTrigger value="Websites" className="flex-shrink-0 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Websites ({items['Websites'].length})</TabsTrigger>
                <TabsTrigger value="Reels" className="flex-shrink-0 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Reels ({items['Reels'].length})</TabsTrigger>
                <TabsTrigger value="Manual" className="flex-shrink-0 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Requires Manual Upload ({items['Requires Manual Upload'].length})</TabsTrigger>
                <TabsTrigger value="Trash" className="flex-shrink-0 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Trash ({items['Trash'].length})</TabsTrigger>
              </TabsList>
              
              {isAdmin && (
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="absolute top-0 right-0 h-10 w-10 md:w-auto md:px-4 rounded-xl bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline font-semibold">Add Links</span>
                </Button>
              )}
            </div>
            
            <div className="mt-6 min-h-[500px]">
              <AnimatePresence mode="wait">
                <TabsContent value="Products" className="m-0" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <ProductsGrid items={items['Products']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="Websites" className="m-0" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <WebsitesGrid items={items['Websites']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="Reels" className="m-0" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <ReelsGrid items={items['Reels']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="Manual" className="m-0" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <ManualUploadGrid items={items['Requires Manual Upload']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="Trash" className="m-0" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <TrashGrid items={items['Trash']} onClearTrash={handleClearTrash} />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </div>
          </Tabs>
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && <AddLinksModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
