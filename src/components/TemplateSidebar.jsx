import { motion } from 'framer-motion';

const templates = [
  { id: 1, img: '/src/assets/templates/temp1.png', name: 'Modern' },
  { id: 2, img: '/src/assets/templates/temp2.png', name: 'Neon' },
  { id: 3, img: '/src/assets/templates/temp3.png', name: 'Minimal' }
];

const TemplateSidebar = () => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      className="fixed right-4 top-24 hidden xl:block w-48 space-y-4 z-40"
    >
      <h3 className="text-neonOrange font-bold text-center text-sm uppercase mb-4">Live Templates</h3>
      {templates.map((t) => (
        <motion.div 
          key={t.id} whileHover={{ scale: 1.05 }}
          className="glass-card p-1 border border-gray-800 cursor-pointer"
        >
          <img src={t.img} alt={t.name} className="rounded opacity-70 hover:opacity-100 transition-opacity" />
          <p className="text-[10px] text-center text-gray-400 mt-1">{t.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
export default TemplateSidebar;