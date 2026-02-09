import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const InfoModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
          onClick={onClose} // Close on backdrop click
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative glass-card border border-white/20 p-8 md:p-12 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X size={24} />
            </button>

            {content.image && (
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl mb-8 border border-white/10"
              />
            )}

            <h2 className="text-4xl font-black uppercase mb-4 text-neonBlue leading-tight">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-neonOrange text-sm font-bold uppercase tracking-widest mb-6">
                {content.subtitle}
              </p>
            )}

            {content.paragraphs && (
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                {content.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {content.cta && (
              <button
                onClick={content.cta.action}
                className="mt-10 px-8 py-4 bg-neonBlue text-black font-black uppercase rounded-xl flex items-center gap-3 hover:scale-105 transition-all"
              >
                {content.cta.text} <ArrowRight size={20} />
              </button>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;