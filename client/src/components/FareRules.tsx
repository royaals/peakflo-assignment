export function FareRules() {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-sky-200">
          <thead>
            <tr className="bg-sky-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">From Line</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">To Line</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">Peak Fare</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">
                Non-Peak Fare
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">Daily Cap</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">
                Weekly Cap
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sky-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Green</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Green</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$8</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$55</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Red</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Red</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$3</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$12</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$70</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Green</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Red</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$4</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$3</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$90</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Red</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">Green</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$3</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sky-900">$90</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  
  