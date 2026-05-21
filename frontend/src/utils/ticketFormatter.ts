/**
 * Utility for parsing and validating ticket input.
 * Implements logic extracted from Docs/formatter.html
 */

export interface ParsedTicket {
  ticket: string;
  amount: number;
  amountPerms?: number; // For Dual Mapping
  type: 'standard' | 'dual' | 'r-indicator';
  isValid: boolean;
  errorMessage?: string;
}

export const parseTicketLine = (line: string): ParsedTicket | null => {
  const text = line.trim();
  if (!text) return null;

  // 1. Extract Prefix (Ticket)
  const prefix = text.substring(0, 3);
  const body = text.substring(3).replace(/[/\~\+\.\=\s]+$/, '');

  // 2. Dual Mapping (123 = 2000/1000)
  const dualMatch = body.match(/(\d+)[Rr\/\s\=\-\.\+\~]+(\d+)/);
  if (dualMatch) {
    return {
      ticket: prefix,
      amount: parseInt(dualMatch[1]),
      amountPerms: parseInt(dualMatch[2]),
      type: 'dual',
      isValid: /^\d{3}$/.test(prefix) && !isNaN(parseInt(dualMatch[1])) && !isNaN(parseInt(dualMatch[2])),
      errorMessage: /^\d{3}$/.test(prefix) ? undefined : "Invalid ticket format"
    };
  }

  // 3. R-Indicator (123 R 1000)
  if (/[Rr®]/.test(body)) {
    const amt = parseInt(body.replace(/[^0-9]/g, ''));
    return {
      ticket: prefix,
      amount: amt,
      type: 'r-indicator',
      isValid: /^\d{3}$/.test(prefix) && !isNaN(amt),
      errorMessage: /^\d{3}$/.test(prefix) ? undefined : "Invalid ticket format"
    };
  }

  // 4. Standard
  const cleanAmt = parseInt(body.replace(/[^0-9]/g, ''));
  return {
    ticket: prefix,
    amount: cleanAmt,
    type: 'standard',
    isValid: /^\d{3}$/.test(prefix) && !isNaN(cleanAmt),
    errorMessage: /^\d{3}$/.test(prefix) ? undefined : "Invalid ticket format"
  };
};

export const formatParsedTicket = (ticket: ParsedTicket): string => {
  if (ticket.type === 'dual') {
    return `${ticket.ticket} = ${ticket.amount}/${ticket.amountPerms}`;
  }
  if (ticket.type === 'r-indicator') {
    return `${ticket.ticket} R ${ticket.amount}`;
  }
  return `${ticket.ticket} = ${ticket.amount}`;
};

/**
 * Generates permutations for a ticket.
 */
export const getPermutations = (ticket: string): string[] => {
  const results: Set<string> = new Set();
  const digits = ticket.split('');
  
  const permute = (arr: string[], m: string[] = []) => {
    if (arr.length === 0) {
      results.add(m.join(''));
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(digits);
  return Array.from(results);
};

export const expandTicketPermutations = (ticket: ParsedTicket): { ticket: string; amount: number }[] => {
  if (ticket.type === 'standard') {
    return [{ ticket: ticket.ticket, amount: ticket.amount }];
  }

  const perms = getPermutations(ticket.ticket);
  
  if (ticket.type === 'r-indicator') {
    return perms.map(p => ({ ticket: p, amount: ticket.amount }));
  }

  if (ticket.type === 'dual') {
    return perms.map(p => ({
      ticket: p,
      amount: p === ticket.ticket ? ticket.amount : (ticket.amountPerms || 0)
    }));
  }

  return [];
};
