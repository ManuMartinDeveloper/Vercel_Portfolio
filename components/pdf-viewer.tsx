'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PDFViewerProps {
  isOpen: boolean
  onClose: () => void
}

export default function PDFViewer({ isOpen, onClose }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 7

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
      <div className="bg-[rgb(var(--card))] rounded-xl md:rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-[rgb(var(--primary))]/10">
          <h3 className="text-sm md:text-xl font-bold text-balance">
            Analysis Dashboard
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-[rgb(var(--muted))] flex-shrink-0"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto p-2 md:p-4">
          <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] bg-[rgb(var(--muted))]/30 rounded-lg flex items-center justify-center">
            <iframe
              src="/Analysis of Developmental Crisis and social Support by gender.pdf"
              className="w-full h-full rounded-lg"
              title="PDF Report"
            />
          </div>
        </div>

        {/* Footer with controls */}
        <div className="flex items-center justify-between p-3 md:p-4 border-t border-[rgb(var(--primary))]/10 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="border-[rgb(var(--primary))]/20 text-xs md:text-sm"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
            <span className="hidden md:inline">Previous</span>
          </Button>
          
          <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="border-[rgb(var(--primary))]/20 text-xs md:text-sm"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 md:ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
