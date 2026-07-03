import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Globe, ShoppingCart, Video, ImageOff, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

function ProgressiveGrid({ items, renderItem }) {
  const [count, setCount] = useState(12);
  
  useEffect(() => {
    if (count < items.length) {
      const timer = setTimeout(() => setCount(c => c + 12), 150);
      return () => clearTimeout(timer);
    }
  }, [count, items.length]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.slice(0, count).map(renderItem)}
    </div>
  );
}

function BaseCard({ item, icon: Icon, onUpdate, onDelete, categoryName }) {
  const isAdmin = localStorage.getItem('adminToken') === 'mitti_dude';
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title || '');

  const handleSaveTitle = () => {
    if (newTitle !== item.title) {
      onUpdate(item._id, { title: newTitle }, categoryName);
    }
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(item._id, { image: reader.result }, categoryName);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group/card h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden glass-card border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl group-hover/card:shadow-primary/10 relative">
        {onDelete && isAdmin && (
          <button 
            onClick={() => onDelete(item._id, categoryName || item.category)}
            className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm"
            title="Move to Trash"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
        
        {item.image && item.image !== 'N/A' && item.image !== 'Failed to extract' ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/50 group/img flex items-center justify-center">
            <img 
              src={item.image} 
              alt={item.title || 'Preview'} 
              loading="lazy"
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover/card:scale-110 opacity-90 group-hover/card:opacity-100"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '';
                e.target.className = 'hidden';
                e.target.nextSibling.className = 'absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted';
              }}
            />
            {onUpdate && isAdmin && (
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer text-white text-xs z-10">
                Change Image
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
            <div className="hidden">
              <ImageOff className="w-8 h-8 opacity-20" />
            </div>
          </div>
        ) : (
          <div className="aspect-[4/5] w-full bg-muted/20 flex flex-col items-center justify-center text-muted-foreground relative">
            <ImageOff className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-sm">No image</span>
            {onUpdate && isAdmin && (
              <label className="mt-4 cursor-pointer glass text-white px-3 py-1.5 rounded-md text-xs hover:bg-white/10 transition-colors">
                Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>
        )}

        <CardContent className="p-4 flex-1 flex flex-col relative z-10 bg-background/50 backdrop-blur-sm border-t border-white/5">
          {isEditing ? (
            <div className="flex gap-2 mb-2">
              <input 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                className="flex h-7 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                autoFocus 
                onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
              />
              <Button size="sm" onClick={handleSaveTitle} className="h-7 text-xs px-2">Save</Button>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-2 mb-2 group/title">
              <h3 className="font-semibold text-sm line-clamp-2" title={item.title}>{item.title}</h3>
              {onUpdate && isAdmin && (
                <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover/title:opacity-100 text-muted-foreground hover:text-primary transition-opacity shrink-0">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-4">
            <Badge variant="secondary" className="flex items-center gap-1 text-[10px] bg-white/5 hover:bg-white/10 border-white/10">
              <Icon className="w-3 h-3" />
              {item.category}
            </Badge>
            <a href={item.url} target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline font-medium">Visit site</a>
          </div>

          {onUpdate && isAdmin && categoryName !== 'Trash' && (
            <div className="absolute top-2 left-2 z-30 opacity-0 group-hover/card:opacity-100 transition-opacity">
               <div className="group/dropdown relative">
                 <button className="glass hover:bg-white/10 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-1 transition-all">
                   Move...
                 </button>
                 <div className="absolute top-full left-0 mt-2 w-28 glass rounded-xl shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all flex flex-col overflow-hidden border border-white/10 backdrop-blur-xl">
                   {categoryName !== 'Products' && <button className="px-3 py-2 text-xs text-left hover:bg-white/10 text-white transition-colors" onClick={() => onUpdate(item._id, { category: 'Products' }, categoryName)}>Products</button>}
                   {categoryName !== 'Websites' && <button className="px-3 py-2 text-xs text-left hover:bg-white/10 text-white transition-colors" onClick={() => onUpdate(item._id, { category: 'Websites' }, categoryName)}>Websites</button>}
                   {categoryName !== 'Reels' && <button className="px-3 py-2 text-xs text-left hover:bg-white/10 text-white transition-colors" onClick={() => onUpdate(item._id, { category: 'Reels' }, categoryName)}>Reels</button>}
                 </div>
               </div>
            </div>
          )}

          {onUpdate && isAdmin && categoryName === 'Products' && (
            <Button 
              variant={item.bought ? "default" : "outline"} 
              size="sm" 
              className={`w-full mt-3 h-8 text-xs flex items-center justify-center gap-1.5 transition-all ${item.bought ? 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/20' : 'bg-transparent border-white/10 hover:bg-white/5'}`} 
              onClick={() => onUpdate(item._id, { bought: !item.bought }, categoryName)}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {item.bought ? 'Bought' : 'Bought?'}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProductsGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No products found yet.</p>;
  return (
    <ProgressiveGrid 
      items={items} 
      renderItem={(item, i) => <BaseCard key={item._id || i} item={item} icon={ShoppingCart} onUpdate={onUpdate} onDelete={onDelete} categoryName="Products" />} 
    />
  );
}

export function WebsitesGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No websites found yet.</p>;
  return (
    <ProgressiveGrid 
      items={items} 
      renderItem={(item, i) => <BaseCard key={item._id || i} item={item} icon={Globe} onUpdate={onUpdate} onDelete={onDelete} categoryName="Websites" />} 
    />
  );
}

export function ReelsGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No reels found yet.</p>;
  return (
    <ProgressiveGrid 
      items={items} 
      renderItem={(item, i) => <BaseCard key={item._id || i} item={item} icon={Video} onUpdate={onUpdate} onDelete={onDelete} categoryName="Reels" />} 
    />
  );
}

function ManualCard({ item, onUpdate, onDelete }) {
  const isAdmin = localStorage.getItem('adminToken') === 'mitti_dude';
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title || '');

  const handleSaveTitle = () => {
    if (newTitle !== item.title) {
      onUpdate(item._id, { title: newTitle }, 'Requires Manual Upload');
    }
    setIsEditing(false);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMove = (category) => {
    if (!previewUrl) return toast.error('Please upload an image first');
    onUpdate(item._id, { image: previewUrl, category }, 'Requires Manual Upload');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group/card h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden glass-card border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl group-hover/card:shadow-primary/10 relative">
        {onDelete && isAdmin && (
          <button 
            onClick={() => onDelete(item._id, 'Requires Manual Upload')}
            className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm"
            title="Move to Trash"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
        {previewUrl ? (
          <div className="aspect-[4/5] w-full overflow-hidden bg-black/50 flex items-center justify-center relative group/img">
            <img src={previewUrl} alt="Preview" loading="lazy" className="object-cover w-full h-full" />
            {isAdmin && (
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer text-white text-xs z-10">
                Change Image
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>
        ) : (
          <div className="aspect-[4/5] w-full bg-muted/20 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
            <ImageOff className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-sm">No image</span>
            {isAdmin && (
              <label className="mt-4 cursor-pointer glass text-white px-3 py-1.5 rounded-md text-xs hover:bg-white/10 transition-colors">
                Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>
        )}
        <CardContent className="p-4 flex-1 flex flex-col relative z-10 bg-background/50 backdrop-blur-sm border-t border-white/5">
          {isEditing ? (
            <div className="flex gap-2 mb-2">
              <input 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                className="flex h-7 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                autoFocus 
                onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
              />
              <Button size="sm" onClick={handleSaveTitle} className="h-7 text-xs px-2">Save</Button>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-2 mb-4 group/title">
              <h3 className="font-semibold text-sm line-clamp-2" title={item.title}>{item.title || 'Untitled Web Item'}</h3>
              {isAdmin && (
                <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover/title:opacity-100 text-muted-foreground hover:text-primary transition-opacity shrink-0">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <a href={item.url} target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline font-medium mb-4 block">Visit site</a>
          
          <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
            <p className="text-[10px] font-medium text-muted-foreground">Classify & Move To:</p>
            {isAdmin && (
              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" variant="outline" className="text-[10px] h-7 bg-transparent border-white/10 hover:bg-white/5 transition-all" onClick={() => handleMove('Products')}>Products</Button>
                <Button size="sm" variant="outline" className="text-[10px] h-7 bg-transparent border-white/10 hover:bg-white/5 transition-all" onClick={() => handleMove('Websites')}>Websites</Button>
                <Button size="sm" variant="outline" className="text-[10px] h-7 bg-transparent border-white/10 hover:bg-white/5 transition-all" onClick={() => handleMove('Reels')}>Reels</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ManualUploadGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No items require manual upload.</p>;
  return (
    <ProgressiveGrid 
      items={items} 
      renderItem={(item, i) => <ManualCard key={item._id || i} item={item} onUpdate={onUpdate} onDelete={onDelete} />} 
    />
  );
}

export function TrashGrid({ items, onClearTrash }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">Trash is empty.</p>;
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="destructive" size="sm" onClick={onClearTrash} className="flex items-center gap-2 rounded-xl shadow-lg hover:shadow-red-500/20 transition-all">
          <Trash2 className="w-4 h-4" /> Empty Trash
        </Button>
      </div>
      <ProgressiveGrid 
        items={items} 
        renderItem={(item, i) => <BaseCard key={item._id || i} item={item} icon={Trash2} categoryName="Trash" />} 
      />
    </div>
  );
}
