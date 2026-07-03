import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Globe, ShoppingCart, Video, ImageOff, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

function BaseCard({ item, icon: Icon, onUpdate, onDelete, categoryName }) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative group/card flex flex-col">
      {onDelete && (
        <button 
          onClick={() => onDelete(item._id, categoryName || item.category)}
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm"
          title="Move to Trash"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
      {item.image ? (
        <div className="aspect-[4/5] w-full overflow-hidden bg-muted flex items-center justify-center relative group/img">
          <img src={item.image} alt={item.title} className="object-cover w-full h-full" onError={(e) => e.target.style.display='none'} />
          {onUpdate && (
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer text-white text-xs">
              Change Image
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          )}
        </div>
      ) : (
        <div className="aspect-[4/5] w-full bg-muted flex flex-col items-center justify-center text-muted-foreground relative">
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-sm">No image available</span>
          {onUpdate && (
            <label className="mt-2 cursor-pointer bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs hover:opacity-90 transition-opacity">
              Upload Image
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          )}
        </div>
      )}
      <CardContent className="p-4 flex-1 flex flex-col">
        {isEditing ? (
          <div className="flex gap-2 mb-2">
            <input 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              className="flex h-7 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
              autoFocus 
              onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
            />
            <Button size="sm" onClick={handleSaveTitle} className="h-7 text-xs px-2">Save</Button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-2 mb-2 group/title">
            <h3 className="font-semibold text-sm line-clamp-2" title={item.title}>{item.title}</h3>
            {onUpdate && (
              <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover/title:opacity-100 text-muted-foreground hover:text-primary transition-opacity shrink-0">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4">
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Icon className="w-3 h-3" />
            {item.category}
          </Badge>
          <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">View Link</a>
        </div>

        {onUpdate && categoryName !== 'Trash' && (
          <div className="absolute top-2 left-2 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity">
             <div className="group/dropdown relative">
               <button className="bg-black/60 hover:bg-black/80 text-white px-2 py-1.5 rounded-md shadow-sm text-xs font-medium flex items-center gap-1">
                 Move...
               </button>
               <div className="absolute top-full left-0 mt-1 w-24 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all flex flex-col overflow-hidden">
                 {categoryName !== 'Products' && <button className="px-3 py-1.5 text-xs text-left hover:bg-muted transition-colors" onClick={() => onUpdate(item._id, { category: 'Products' }, categoryName)}>Products</button>}
                 {categoryName !== 'Websites' && <button className="px-3 py-1.5 text-xs text-left hover:bg-muted transition-colors" onClick={() => onUpdate(item._id, { category: 'Websites' }, categoryName)}>Websites</button>}
                 {categoryName !== 'Reels' && <button className="px-3 py-1.5 text-xs text-left hover:bg-muted transition-colors" onClick={() => onUpdate(item._id, { category: 'Reels' }, categoryName)}>Reels</button>}
               </div>
             </div>
          </div>
        )}

        {onUpdate && categoryName === 'Products' && (
          <Button 
            variant={item.bought ? "default" : "outline"} 
            size="sm" 
            className={`w-full mt-3 h-8 text-xs flex items-center justify-center gap-1.5 ${item.bought ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`} 
            onClick={() => onUpdate(item._id, { bought: !item.bought }, categoryName)}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {item.bought ? 'Bought' : 'Bought?'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function ProductsGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No products found yet.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => <BaseCard key={item._id || i} item={item} icon={ShoppingCart} onUpdate={onUpdate} onDelete={onDelete} categoryName="Products" />)}
    </div>
  );
}

export function WebsitesGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No websites found yet.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => <BaseCard key={item._id || i} item={item} icon={Globe} onUpdate={onUpdate} onDelete={onDelete} categoryName="Websites" />)}
    </div>
  );
}

export function ReelsGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No reels found yet.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => <BaseCard key={item._id || i} item={item} icon={Video} onUpdate={onUpdate} onDelete={onDelete} categoryName="Reels" />)}
    </div>
  );
}

function ManualCard({ item, onUpdate, onDelete }) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative group/card flex flex-col">
      {onDelete && (
        <button 
          onClick={() => onDelete(item._id, 'Requires Manual Upload')}
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm"
          title="Move to Trash"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
      {previewUrl ? (
        <div className="aspect-[4/5] w-full overflow-hidden bg-muted flex items-center justify-center relative group">
          <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
          <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs">
            Change Image
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        <div className="aspect-[4/5] w-full bg-muted flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-sm">No image available</span>
          <label className="mt-4 cursor-pointer bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs hover:opacity-90 transition-opacity">
            Upload Image
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      )}
      <CardContent className="p-4 flex-1 flex flex-col">
        {isEditing ? (
          <div className="flex gap-2 mb-2">
            <input 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              className="flex h-7 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
              autoFocus 
              onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
            />
            <Button size="sm" onClick={handleSaveTitle} className="h-7 text-xs px-2">Save</Button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-2 mb-2 group/title">
            <h3 className="font-semibold text-sm line-clamp-2" title={item.title}>{item.title}</h3>
            <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover/title:opacity-100 text-muted-foreground hover:text-primary transition-opacity shrink-0">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mb-4 block">View Link</a>
        
        <div className="mt-auto pt-4 border-t space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Classify & Move To:</p>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleMove('Products')}>Products</Button>
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleMove('Websites')}>Websites</Button>
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleMove('Reels')}>Reels</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ManualUploadGrid({ items, onUpdate, onDelete }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">No items require manual upload.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => <ManualCard key={item._id || i} item={item} onUpdate={onUpdate} onDelete={onDelete} />)}
    </div>
  );
}

export function TrashGrid({ items, onClearTrash }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8 text-center">Trash is empty.</p>;
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="destructive" size="sm" onClick={onClearTrash} className="gap-2">
          <Trash2 className="w-4 h-4" /> Empty Trash
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => <BaseCard key={item._id || i} item={item} icon={Trash2} categoryName="Trash" />)}
      </div>
    </div>
  );
}
